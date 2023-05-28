<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-delete-employee"
  >
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>
          Bạn có thực sự muốn xóa nhân viên &lt;{{ this.employeeIdDelete }}&gt;
          không?
        </p>
      </div>
    </div>
    <div class="dialog-warning-delete-footer">
      <misa-button-extra
        @click="btnConfirmNoDeleteEmployee"
        :textButtonExtra="'Không'"
      ></misa-button-extra>
      <misa-button-default
        class="btn-no-minwwidth"
        @click="btnConfirmYesDeleteEmployee"
        :textButton="'Có'"
      ></misa-button-default>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeConfirmDelete",
  props: ["employeeIdDelete"],
  methods: {
    btnConfirmYesDeleteEmployee() {
      this.$emit("confirmYesDeleteEmployee");
    },
    btnConfirmNoDeleteEmployee() {
      this.$emit("confirmNoDeleteEmployee");
    },
  },
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
