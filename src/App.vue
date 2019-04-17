<template>
  <div id="app">
    <!-- header -->
    <app-header :poiInfo="poiInfo"></app-header>
    <!-- navigator -->
    <app-nav></app-nav>
    <router-view></router-view>
    <!-- content -->
    <!-- <app-content></app-content> -->
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Nav from "./components/nav/Nav.vue";
import Content from "./components/content/Content.vue";

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-nav": Nav,
    "app-content": Content
  },
  data() {
    return {
      poiInfo: {}
    };
  },
  created() {
    fetch("/mock/goods.json")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.poiInfo = response.data.poi_info;
        }
      });
  }
};
</script>

<style>
</style>
