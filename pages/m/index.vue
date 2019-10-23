
<template>
  <section class="container">
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

export default {
  layout:'mobile',
  async asyncData({ params, app, $axios, store, query }) {
    let { data } = await get('/shakespeare/notes/33102571/user_notes')
    console.log(data)
    // await store.dispatch("getUsers");
  },
  // async fetch({ store, params }){
  //   console.log(params);

  //   await store.dispatch('getUsers')
  // },
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
        },
      ]
    };
  },
};
</script>

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
