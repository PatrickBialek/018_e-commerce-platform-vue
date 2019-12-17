<template>
  <section class="intro">
    <div class="intro__container custom-container">
      <h1>
        Wonderful
        <span>e-commerce</span> platform
      </h1>
      <p>Enjoy adding products to your shopping card or sign in as an admin and add or remove chosen products.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Intro",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables-and-brakpoints.scss";
@import "@/assets/styles/_contianer.scss";

.intro {
  width: 100%;
  height: calc(100vh - 63px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  &__container {
    max-width: 700px;
    @include smallScreen {
      padding: 30px;
    }
    h1 {
      font-size: 4rem;
      margin-bottom: 2rem;
      @include smallScreen {
        font-size: 3.75rem;
        margin-bottom: 1.5rem;
      }
      @include touchScreen {
        font-size: 2.75rem;
        margin-bottom: 1rem;
        line-height: 1.25;
      }
      span {
        color: $red;
      }
    }
    p {
      font-size: 2.2rem;
      font-weight: 300;
      line-height: 1.4;
      @include smallScreen {
        font-size: 2rem;
      }
      @include touchScreen {
        font-size: 1.8rem;
      }
      @include mobileScreen {
        font-size: 1.7rem;
      }
    }
  }
}
</style>
