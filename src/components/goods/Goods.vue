<template>
  <div class="goods">
    <!-- categories -->
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!-- goods list -->
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: {},
      goods: []
    };
  },
  created() {
    fetch("/mock/goods.json")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.container = response.data.container_operation_source;
          this.goods = response.data.food_spu_tags;
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}
.goods .menu-wrapper {
  flex: 0 0 85px;
  background: #f4f4f4;
}
.goods .foods-wrapper {
  flex: 1;
  background: blue;
}
.goods .menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
}
.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
</style>
