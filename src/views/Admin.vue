<template>
  <main id="admin-panel" class="custom-container">
    <section class="add-product">
      <div class="add-product__container">
        <h2>Add new product:</h2>
        <form v-on:submit.prevent>
          <input
            class="add-product__field"
            name="product name"
            v-model="newProduct.title"
            type="text"
            placeholder="name..."
          />
          <input
            class="add-product__field"
            v-model="newProduct.price"
            name="product price"
            type="number"
            placeholder="price..."
          />
          <input
            class="add-product__field"
            v-model="newProduct.image"
            name="product image"
            type="text"
            placeholder="link to image..."
          />
          <textarea
            class="add-product__description"
            v-model="newProduct.description"
            name="product description"
            placeholder="Description..."
          ></textarea>
          <input @click="addNewProduct" type="submit" class="add-product__btn" value="Add product" />
          <p class="error" v-if="error">{{ error }}</p>
        </form>
      </div>
    </section>
    <section class="products">
      <div class="products__container custom-container">
        <h2>Products in store</h2>
        <div class="products__list">
          <div
            :data-id="product.id"
            class="products__single-product"
            v-for="(product, index) in products"
            :key="index"
          >
            <button class="products__remove" @click="deleteProduct">Delete</button>
            <div class="products__product-image">
              <img :src="product.image" alt="store item" />
            </div>
            <div class="products__product-text">
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
              <span class="products__product-price">{{ product.price }} zł</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Admin",
  data() {
    return {
      newProduct: {
        title: null,
        price: null,
        description: null,
        image: null
      },
      error: false,
      products: []
    };
  },
  methods: {
    addNewProduct() {
      const id = Math.floor(Date.now() / 1000);

      db.collection("products")
        .add({
          title: this.newProduct.title,
          price: this.newProduct.price,
          description: this.newProduct.description,
          image: this.newProduct.image,
          id: id
        })
        .then(() => {
          this.addToCurrentProducts();
        })
        .then(() => {
          this.resetForm();
        })
        .catch(err => {
          this.error = err;
        });
    },
    addToCurrentProducts(id) {
      this.products.push({
        title: this.newProduct.title,
        price: this.newProduct.price,
        description: this.newProduct.description,
        image: this.newProduct.image,
        id: null
      });
    },
    deleteProduct(e) {
      const productContainer = e.target.closest(".products__single-product"),
        id = productContainer.dataset.id,
        r = confirm("Are you sure? Note will be removed.");

      if (r === true) {
        db.collection("products")
          .doc(id)
          .delete()
          .then(() => {
            this.updateAfterDeleteProduct(id);
          });
      }
    },
    updateAfterDeleteProduct(id) {
      const product = this.products.find(product => product.id === id),
        index = this.products.indexOf(product);
      this.products.splice(index, 1);
    },
    resetForm() {
      this.newProduct.title = null;
      this.newProduct.price = null;
      this.newProduct.description = null;
      this.newProduct.image = null;
    }
  },
  created() {
    // Fetch data from the firebase
    db.collection("products")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const product = doc.data();
          product.id = doc.id;
          this.products.push(product);
        });
      });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_contianer.scss";
@import "@/assets/styles/_variables-and-brakpoints.scss";

#admin-panel {
  display: flex;
  padding: 60px 20px;
  flex-direction: row;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  @include touchScreen {
    flex-direction: column;
  }
}

.add-product {
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  max-height: 500px;
  @include touchScreen {
    padding: 30px 0;
  }
  &__container {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px 0px #c4c4c4;
    padding: 20px;
    h2 {
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
  }
  &__field,
  &__btn,
  &__description {
    padding: 12px 0;
    font-size: 1.8rem;
    outline: none;
    border-radius: none;
  }
  &__field {
    margin-bottom: 20px;
    background-color: #fff !important;
    border: none;
    border-bottom: 1px solid $black;
  }
  &__description {
    border-bottom: 1px solid $black;
    width: 100%;
    height: 100px;
    resize: none;
    margin-bottom: 20px;
    padding: 12px;
    box-sizing: border-box;
  }
  &__btn {
    border: 1px solid $black;
    background-color: #fff;
    color: $black;
    cursor: pointer;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    &:hover {
      background-color: $black;
      color: #fff;
    }
  }
  .error {
    color: $red;
    margin-top: 10px;
  }
}
.products {
  display: flex;
  justify-content: center;
  padding: 50px 20px;
  flex-grow: 3;
  @include touchScreen {
    padding: 30px 0;
  }
  &__container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px 0px #c4c4c4;
    padding: 20px;
    h2 {
      margin-bottom: 20px;
    }
  }
  &__single-product {
    display: flex;
    padding: 20px;
    border: 1px solid #e2e2e2;
    margin-bottom: 20px;
    position: relative;
    @include mobileScreen {
      flex-direction: column;
    }
  }
  &__product-image {
    padding: 10px;
    display: flex;
    justify-content: center;
    img {
      max-height: 200px;
      object-fit: cover;
      @include mobileScreen {
        max-height: unset;
        width: 100%;
        max-width: 150px;
      }
    }
  }
  &__product-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      margin-bottom: 10px;
    }
    p {
      font-weight: 300;
      color: $gray-light;
      font-size: 1.4rem;
      max-width: 600px;
    }
  }
  &__product-price {
    font-size: 1.4rem;
    color: $red;
    margin-top: 1rem;
  }
  &__remove {
    color: #fff;
    background-color: $red;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.35s ease-in-out;
    outline: none;
    &:hover {
      background-color: darken($red, 10%);
    }
  }
}
</style>