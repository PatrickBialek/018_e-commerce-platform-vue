import Vue from "vue";
import Vuex from "vuex";

import * as mutations from "./modules/mutations";
import * as actions from "./modules/actions";
import * as getters from "./modules/getters";

Vue.use(Vuex);

let products = window.localStorage.getItem("products");
let totalPrice = window.localStorage.getItem("totalPrice");

export default new Vuex.Store({
  state: {
    isAdminOnline: false,
    shopingCard: {
      products: products ? JSON.parse(products) : [],
      totalPrice: totalPrice ? Number(totalPrice) : 0
    }
  },
  mutations,
  actions,
  getters
});