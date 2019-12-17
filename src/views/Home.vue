<template>
  <main>
    <Intro />
    <AboutStore />
    <ShopingCard />
    <section class="products">
      <div class="custom-container">
        <h2>Our products</h2>
        <div class="products__sort-container">
          <span>Sort by...</span>
          <select v-model="sortValue" @change="sortBy()">
            <option value="price">Price</option>
            <option value="title">Name</option>
          </select>
        </div>
        <div class="products__container">
          <div class="products__item" v-for="(product, index) in products" :key="index">
            <SingleProduct :product="product" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import Intro from "@/components/home/Intro.vue";
import AboutStore from "@/components/home/AboutStore.vue";
import ShopingCard from "@/components/home/ShopingCard.vue";
import SingleProduct from "@/components/home/SingleProduct.vue";

export default {
  name: "home",
  data() {
    return {
      products: [],
      sortValue: null
    };
  },
  components: {
    Intro,
    AboutStore,
    SingleProduct,
    ShopingCard
  },
  computed: {
    isShopingCardEmpty() {}
  },
  created() {
    // Fetch data from the firebase
    db.collection("products")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const product = doc.data();
          this.products.push(product);
        });
      });
  },
  methods: {
    sortBy() {
      const property = this.sortValue;
      this.products.sort((a, b) => (a[property] < b[property] ? -1 : 1));
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables-and-brakpoints.scss";
@import "@/assets/styles/_contianer.scss";

main {
  padding-top: 60px;
  .products {
    text-align: center;
    padding: 50px 0;
    &__container {
      display: flex;
      justify-content: center;
      padding: 50px 0;
      flex-wrap: wrap;
      box-sizing: border-box;
      @include mobileScreen {
        align-items: center;
        flex-wrap: none;
        padding: 25px;
      }
    }
    h2 {
      font-size: 3rem;
      font-weight: bold;
    }
    &__sort-container {
      display: flex;
      width: 100%;
      padding: 30px 0 50px;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      & > span {
        margin-bottom: 10px;
      }
      select {
        padding: 12px 24px;
        border: 1px solid $black;
        border-radius: 0;
        outline: none;
        font-size: 1.6rem;
        width: 200px;
      }
    }
    &__item {
      max-width: 400px;
      @include mobileScreen {
        width: 100%;
        margin-bottom: 15px;
      }
    }
  }
}
</style>