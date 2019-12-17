<template>
  <header class="header">
    <div class="header__contanier custom-container">
      <div class="header__logo-box">
        <img src="@/assets/icons/logo.svg" alt="E-commerce platform logo" />
      </div>
      <nav class="header__nav-box">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="admin">
            <router-link to="/admin">Admin panel</router-link>
          </li>
          <li v-else>
            <router-link to="/sign-in">Sign in</router-link>
          </li>
        </ul>
        <input
          v-if="admin"
          class="header__sign-out"
          @click="signOut"
          type="submit"
          value="Sign Out"
        />
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  computed: {
    admin() {
      return this.$store.getters.getIsAdminOnline;
    }
  },
  methods: {
    signOut() {
      this.$store.commit("updateIsAdminOnline", false);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_contianer.scss";
@import "@/assets/styles/_variables-and-brakpoints.scss";

.header {
  background-color: $white;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px rgba(196, 196, 196, 1);
  width: 100%;
  position: fixed;
  z-index: 10;
  &__contanier {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    flex-direction: row;
  }
  &__logo-box {
    height: 100%;
    img {
      height: 40px;
      @include mobileScreen {
        height: 30px;
      }
    }
  }
  &__nav-box {
    display: flex;
    align-items: center;
    ul {
      display: flex;
      align-items: center;
      height: 100%;
      li {
        padding: 0 10px;
        @include mobileScreen {
          padding: 0 5px;
        }
        a {
          color: $black;
          font-size: 1.6rem;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          @include mobileScreen {
            font-size: 1.4rem;
          }
          &.router-link-exact-active,
          &:active {
            color: $red;
          }
          &::after {
            display: block;
            content: "";
            width: 0%;
            height: 2px;
            position: absolute;
            background-color: $red;
            transition: width 0.3s ease-in-out;
          }
          &:hover:after {
            width: 100%;
          }
        }
      }
    }
  }
  &__sign-out {
    border: none;
    background-color: #fff;
    color: $black;
    font-size: 1.6rem;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    @include mobileScreen {
      font-size: 1.4rem;
    }
  }
}
</style>
