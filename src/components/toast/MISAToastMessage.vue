<template>
  <div class="toast-success">
    <div class="toast-info">
      <div class="check-green-icon"></div>
      <p><b>Thành công!</b> {{ this.contentToast }}.</p>
    </div>
    <div class="toast-exits">
      <div class="icon-tb close-icon" @click="onCloseToastMessage"></div>
      <a href="#">Hoàn tác</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "MISAToastMessage",
  props: ["contentToast"],
  methods: {
    onCloseToastMessage() {
      this.$emit("closeToastMessage");
    },
  },
};
</script>

<style>
@import url(@/css/components/toastmessage.css);

.toast-success {
  position: fixed;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
}
</style>
