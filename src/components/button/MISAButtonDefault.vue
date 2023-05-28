<template>
  <button class="btn btn-default">
    <div class="text">{{ this.textButton }}</div>
  </button>
</template>

<script>
export default {
  name: "MISAButtonDefault",
  props: ["textButton"],
};
</script>

<style>
@import url(@/css/components/button.css);
</style>
