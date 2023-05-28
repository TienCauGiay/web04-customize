<template>
  <button class="btn btn-extra">
    <div class="text-extra">{{ textButtonExtra }}</div>
  </button>
</template>

<script>
export default {
  name: "MISAButtonExtra",
  props: ["textButtonExtra"],
};
</script>

<style>
@import url(@/css/components/button.css);
</style>
