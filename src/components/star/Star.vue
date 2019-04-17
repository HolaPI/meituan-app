<template>
  <div class="star">
    <span
      class="star-item"
      :class="itemClass"
      v-for="(itemClass, index) in itemClasses"
      :key="index"
    ></span>
  </div>
</template>

<script>
//star length
const LENGTH = 5;
//star status
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses() {
      let result = [];
      //integer or half
      let score = Math.floor(this.score * 2) / 2;
      //has half_star
      let hasDemical = score % 1 !== 0;
      //full_star amount
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDemical) {
        result.push(CLS_HALF);
      }
      //complement blank_star
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star {
  font-size: 0;
}
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}
.star .star-item:last-child {
  margin-right: 0;
}
.star .on {
  background-image: url("./img/star24_on@2x.png");
}
.star .half {
  background-image: url("./img/star24_half@2x.png");
}
.star .off {
  background-image: url("./img/star24_off@2x.png");
}
</style>