<template>
  <input
    class="textfield"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "MISAInput",
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
@import url(@/css/components/input.css);

input {
  height: 30px;
  width: 100%;
}
</style>
