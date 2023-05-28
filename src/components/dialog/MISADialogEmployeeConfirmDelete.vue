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
      <button
        class="btn btn-extra"
        id="btn-warning-delete-employee-no"
        @click="btnConfirmNoDeleteEmployee"
      >
        <div class="text-extra">Không</div>
      </button>
      <button
        class="btn btn-default btn-no-minwwidth"
        id="btn-warning-delete-employee-yes"
        @click="btnConfirmYesDeleteEmployee"
      >
        <div class="text">Có</div>
      </button>
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
