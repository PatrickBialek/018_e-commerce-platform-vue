<template>
  <section class="about">
    <div class="custom-container">
      <h2>About platform</h2>
      <div class="about__icons-container">
        <div class="about__item" v-for="(item, index) in items" :key="index">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutStore",
  data() {
    return {
      items: [
        {
          title: "Admin Panel",
          content:
            "Morbi dolor nunc, dapibus nec massa non, posuere consequat neque."
        },
        {
          title: "Products list",
          content: "Duis eu varius eros, at maximus est."
        },
        {
          title: "Shoping Card",
          content:
            "Mauris vehicula accumsan justo, vitae lobortis purus tempor id."
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables-and-brakpoints.scss";
@import "@/assets/styles/_contianer.scss";

.about {
  display: flex;
  width: 100%;
  padding: 0px 20px 50px;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  h2 {
    font-size: 3rem;
    font-weight: bold;
    @include smallScreen {
      font-size: 2.5rem;
    }
  }
  &__icons-container {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    @include mobileScreen {
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    }
  }
  &__item {
    width: 33.3333%;
    text-align: left;
    background-color: #f4f4f4;
    margin: 0 20px;
    padding: 24px;
    @include smallScreen {
      padding: 20px;
      margin: 0 10px;
    }
    @include mobileScreen {
      width: 100%;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    h3 {
      margin-bottom: 10px;
      @include smallScreen {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
