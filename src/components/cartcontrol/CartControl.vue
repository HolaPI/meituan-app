<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="cart-decrease icon-remove_circle_outline"
        v-show="food.count"
        @touchend.stop.prevent="decreaseCart"
      ></div>
    </transition>
    <transition name="count">
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
    </transition>

    <div class="cart-add icon-add_circle" @touchend.stop.prevent="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    decreaseCart() {
      if (this.food.count > 0) {
        this.food.count--;
      } else {
        this.$delete(this.food, "count");
      }
    },
    increaseCart() {
      if (!this.food.count) {
        // Vue.set(this.food, "count", 1);
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartcontrol {
  font-size: 0;
}
.cartcontrol .cart-decrease {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #b4b4b4;
}
.cartcontrol .cart-count {
  display: inline-block;
  width: 25px;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  vertical-align: top;
}
.cartcontrol .cart-add {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #ffd161;
  position: relative;
}
.cartcontrol .cart-add .bg {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #000;
  position: absolute;
  left: 3px;
  top: 3px;
  z-index: -1;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.3s linear;
}
.move-enter,
.move-leave-to {
  transform: translateX(26px) rotate(180deg);
}
.count-enter-active {
  transition: all 0.2s linear;
}
.count-enter {
  transform: translateX(13px);
}
</style>
