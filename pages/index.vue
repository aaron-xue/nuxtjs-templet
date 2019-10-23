
<template>
  <section class="container">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
          <img :src="banner" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">USERS</h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">{{ user.name }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import {get} from "~/plugins/axios";
import Vue from "vue";

// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  const VueAwesomeSwiper = require("vue-awesome-swiper/dist/ssr");
  Vue.use(VueAwesomeSwiper);
}

export default {
  layout: "pc",
  async asyncData({ params, app, $axios, store, query }) {
    // let { data } = await get("/shakespeare/notes/33102571/user_notes");
    // console.log(data);
    // await store.dispatch("getUsers");
  },
  // async fetch({ store, params }){
  //   console.log(params);

  //   await store.dispatch('getUsers')
  // },
  data() {
    return {
      banners: [
        "cdnImgUrl/v2/b_sub0.png",
        "cdnImgUrl/v2/b_sub1.png",
        "cdnImgUrl/v2/b_sub2.png"
      ],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
        // some swiper options...
      }
    };
  },
  validate() {
    return true;
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  head() {
    return {
      title: "Users",
      meta: [
        {
          hid: "abc",
          name: "abc",
          content: "abc"
        }
      ]
    };
  }
};
</script>
<style lang="css">
@import "swiper/dist/css/swiper.css";
</style>
<style lang="scss" scoped>
.title {
  margin: 30px 0;
}
.users {
  list-style: none;
  margin: 0;
  padding: 0;
  .user {
    margin: 10px 0;
  }
}
</style>
