<template>
  <section class="shoping-card">
    <div class="shoping-card__container custom-container">
      <h2>Shoping card:</h2>
      <div v-if="isShopingCardShown" class="shoping-card__items-list">
        <ShopingCardSignleItem v-for="(product, index) in products" :key="index" :product="product"></ShopingCardSignleItem>
      </div>
      <div>
        <span>Sum: {{ totalPrice }} zł</span>
      </div>
      <button
        class="shoping-card__show-hide-btn"
        @click="isShopingCardShown = !isShopingCardShown"
      >{{ isShopingCardShown ? "Hide" : "Show" }}</button>
    </div>
  </section>
</template>

<script>
import ShopingCardSignleItem from "./ShopingCardSignleItem.vue";

export default {
  name: "ShopingCard",
  data() {
    return {
      isShopingCardShown: false
    };
  },
  components: {
    ShopingCardSignleItem
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_contianer.scss";
@import "@/assets/styles/_variables-and-brakpoints.scss";

.shoping-card {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 30px;
  @include mobileScreen {
    padding: 0 10px;
  }
  &__container {
    box-shadow: 0px 2px 5px 0px #c4c4c4;
    padding: 20px;
    text-align: center;
    @include mobileScreen {
      padding: 10px 4px;
    }
    h2 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  &__items-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__show-hide-btn {
    border: 1px solid $black;
    outline: none;
    transition: background-color 0.35s ease-in-out;
    color: $black;
    background-color: #fff;
    width: 120px;
    padding: 6px 12px;
    text-align: center;
    margin: 10px auto 0;
    font-size: 1.6rem;
    &:hover {
      background-color: $black;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>