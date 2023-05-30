<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-question-employee"
  >
    <div class="dialog-content">
      <div class="question-blue-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>Dữ liệu đã bị thay đổi. Bạn có muốn cất không?</p>
      </div>
    </div>
    <div class="dialog-question-footer">
      <div class="dialog-question-footer-left">
        <misa-button-extra
          :textButtonExtra="'Hủy'"
          class="btn-no-minwwidth"
          @click="cancelButton"
        ></misa-button-extra>
      </div>
      <div class="dialog-question-footer-right">
        <misa-button-extra
          :textButtonExtra="'Không'"
          @click="noButton"
        ></misa-button-extra>
        <misa-button-default
          :textButton="'Có'"
          class="btn-no-minwwidth"
          @click="yesButton"
        ></misa-button-default>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeSaveAndClose",
  methods: {
    cancelButton() {
      this.$emit("cancelDialogDataChange");
    },
    noButton() {
      this.$emit("noDialogDataChange");
    },
    yesButton() {
      this.$emit("yesDialogDataChange");
    },
  },
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
