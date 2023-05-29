<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-danger-employee"
  >
    <div class="dialog-content">
      <div class="danger-red-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p id="dialog-content-main-notnull">
          {{ this.valueNotNull }} không được để trống.
        </p>
      </div>
    </div>
    <div class="dialog-danger-footer">
      <button
        class="btn btn-default"
        id="btn-danger-employee-close"
        @click="btnClose"
      >
        <div class="text">Đóng</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeInputDataNotBlank",
  props: ["valueNotNull"],
  methods: {
    /**
     * Mô tả: Hàm gọi sự kiện cất và thêm trong component cha (EmployeeDetail)
     * created by : BNTIEN
     * created date: 29-05-2023 08:35:28
     */
    btnClose() {
      this.$emit("closeBtnSaveAndClose");
    },
  },
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
