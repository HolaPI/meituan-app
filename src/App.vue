<template>
  <div id="app">
    <!-- header -->
    <app-header :poiInfo="poiInfo"></app-header>
    <!-- navigator -->
    <app-nav :commentNum="commentNum"></app-nav>
    <!-- keepalive to keep last status -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- content -->
    <!-- <app-content></app-content> -->
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Nav from "./components/nav/Nav.vue";

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-nav": Nav
  },
  data() {
    return {
      poiInfo: {},
      commentNum: 0
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
    fetch("/mock/ratings.json")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.commentNum = response.data.comment_num;
        }
      });
  }
};
</script>

<style>
</style>
