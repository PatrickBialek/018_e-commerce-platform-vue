<template>
  <div class="product" :data-id="product.id">
    <div class="product__picture">
      <img :src="product.image" alt="Chair product" />
    </div>
    <div class="product__info">
      <h3>{{ product.title }}</h3>
      <p class="product__description">{{ product.description }}</p>
      <span class="product__price">{{ product.price }} zł</span>
      <button @click="addToShopingCard" class="product__btn">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleProduct",
  data() {
    return {
      productData: this.product
    };
  },
  props: {
    product: Object
  },
  methods: {
    addToShopingCard(e) {
      // Check if in store is this product
      const products = this.$store.getters.getProducts,
        productJSON = JSON.parse(JSON.stringify(products)),
        productId = Number(e.target.closest(".product").dataset.id),
        result = products.find(product => product.id == productId);

      // If isn't in store add to store
      if (result == null) {
        this.$store.commit("addNewProduct", {
          amount: 1,
          content: this.product.description,
          id: this.product.id,
          image: this.product.image,
          price: this.product.price,
          title: this.product.title
        });

        const price = Number(this.product.price);
        this.$store.commit("updateTotalPrice", price);
      }
      // If is in store add amount +1
      else {
        const by = 1;
        const price = Number(this.product.price);

        this.$store.commit("updateProductAmount", { productId, by });
        this.$store.commit("updateTotalPrice", price);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables-and-brakpoints.scss";

.product {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 5px 0px #c4c4c4;
  margin: 10px;
  @include mobileScreen {
    max-width: unset;
    margin: 0;
  }
  &__picture {
    width: 100%;
    height: 250px;
    padding: 10px;
    box-sizing: border-box;
    @include mobileScreen {
      height: 200px;
    }
    img {
      height: 100%;
      object-fit: cover;
      max-width: 100%;
    }
  }
  &__info {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span,
    button {
      display: block;
    }
    h3 {
      margin-bottom: 1rem;
    }
    p {
      font-weight: 300;
      color: $gray-light;
      font-size: 1.4rem;
    }
  }
  &__price {
    font-size: 1.4rem;
    color: $red;
    margin-top: 1rem;
  }
  &__btn {
    width: 100px;
    margin: 1rem auto 0;
    background-color: none;
    border: 1px solid $black;
    font-size: 1.4rem;
    outline: none;
    cursor: pointer;
    transition: color 0.35s ease-in-out;
    &:hover {
      color: $red;
    }
  }
}
</style>
