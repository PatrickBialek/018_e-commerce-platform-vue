<template>
  <div class="item" :data-id="product.id">
    <button class="item__remove" @click="reomveItem">X</button>
    <div class="item__image">
      <img :src="product.image" alt="shoping card item" />
    </div>
    <div class="item__text">
      <h3>{{ product.title }}</h3>
      <div class="item__counter">
        <span>Amount:</span>
        <div class="item__btns-box">
          <span>{{ product.amount }}</span>
          <div class="item__btns">
            <button @click="addAmount">+</button>
            <button @click="subAmount">-</button>
          </div>
        </div>
      </div>
      <div class="item__price">
        <span>{{ product.price * product.amount }} zł</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopingCardSingleItem",
  data() {
    return {
      amount: 1,
      price: 10,
      productData: this.product
    };
  },
  methods: {
    addAmount(e) {
      const by = 1,
        productId = this.product.id,
        price = Number(this.product.price);

      this.$store.commit("updateProductAmount", { productId, by });
      this.$store.commit("updateTotalPrice", price);
    },
    subAmount() {
      if (this.product.amount == 0) {
        this.product.amount = 0;
      } else {
        const by = -1,
          productId = this.product.id,
          price = Number(this.product.price) * -1;

        this.$store.commit("updateProductAmount", { productId, by });
        this.$store.commit("updateTotalPrice", price);
      }
    },
    reomveItem() {
      const id = this.product.id,
        price = this.product.price * this.product.amount * -1;

      this.$store.commit("removeProduct", id);
      this.$store.commit("updateTotalPrice", price);
    }
  },
  props: {
    product: Object
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables-and-brakpoints.scss";

.item {
  display: flex;
  max-width: 600px;
  box-sizing: border-box;
  padding: 20px;
  border: solid 1px #e2e2e2;
  width: 70%;
  margin-bottom: 10px;
  position: relative;
  @include mobileScreen {
    padding: 4px;
    width: 100%;
  }
  &__image {
    display: flex;
    align-items: center;
    img {
      height: 100px;
      object-fit: cover;
      @include mobileScreen {
        height: 80px;
      }
    }
  }
  &__text {
    display: flex;
    height: auto;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    width: 100%;
    @include mobileScreen {
      padding: 10px;
    }
    h3 {
      margin: 0 10px;
      max-width: 100px;
      @include mobileScreen {
        margin-bottom: 15px;
      }
    }
  }
  &__counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
    height: 100%;
    position: relative;
    @include mobileScreen {
      padding: 10px;
    }
    & > span {
      position: absolute;
      top: 0;
    }
  }
  &__btns-box {
    display: flex;
    padding: 10px;
    & > span {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    button {
      border: none;
      outline: none;
      background-color: $black;
      color: #fff;
      margin: 1px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      font-size: 1.8rem;
      &:hover {
        background-color: lighten($black, 20%);
      }
    }
  }
  &__btns {
    display: flex;
    flex-direction: column;
  }
  &__price {
    color: $red;
    font-weight: 300;
  }
  &__remove {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    color: $red;
    font-size: 2rem;
    padding: 4px;
    cursor: pointer;
  }
}
</style>