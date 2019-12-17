<template>
  <main>
    <section class="sign-in">
      <div class="sign-in__container custom-container">
        <div class="sign-in__card">
          <form v-on:submit.prevent>
            <input class="sign-in__field" v-model="admin.email" type="text" placeholder="mail..." />
            <input
              class="sign-in__field"
              v-model="admin.password"
              type="password"
              placeholder="password..."
            />
            <input @click="SignIn" type="submit" class="sign-in__btn" value="Sign In" />
            <p class="error" v-if="error">{{ error }}</p>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "sign-in",
  data() {
    return {
      admin: {
        email: null,
        password: null
      },
      error: null
    };
  },
  methods: {
    SignIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.admin.email, this.admin.password)
        .then(() => {
          this.$store.commit("updateIsAdminOnline", true);
        })
        .then(() => {
          this.$router.push("/admin");
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_contianer.scss";
@import "@/assets/styles/_variables-and-brakpoints.scss";

main {
  padding-top: 60px;
  height: calc(100vh - 60px);
}

.sign-in {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  &__container {
    align-items: center;
    justify-content: center;
    @include mobileScreen {
      padding: 10px;
    }
  }
  &__card {
    width: 300px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px 0px #c4c4c4;
    padding: 40px 20px;
    @include mobileScreen {
      width: 100%;
      max-width: 300px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
  }
  &__field,
  &__btn {
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
</style>