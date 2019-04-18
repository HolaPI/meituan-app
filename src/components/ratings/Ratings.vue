<template>
  <div class="ratings">
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left"></div>
        <div class="overview-right"></div>
      </div>
      <!-- separator -->
      <app-split></app-split>
    </div>
  </div>
</template>

<script>
import Split from "../split/Split.vue";
export default {
  components: {
    "app-split": Split
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
