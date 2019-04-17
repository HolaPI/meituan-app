<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">
      点餐
      <i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="nav-item">
      评价
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="nav-item">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}
.nav-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #666;
  position: relative;
}
/* when selected item is active */
.nav .active {
  color: #ffbb22;
}
.nav .active .line {
  width: 100%;
  height: 2px;
  display: inline-block;
  background: #ffbb22;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -50%;
}
</style>
