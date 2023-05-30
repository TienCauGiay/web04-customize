<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-delete-employee"
  >
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>
          Bạn có thực sự muốn xóa nhân viên &lt;{{
            this.employeeCodeDelete
          }}&gt; không?
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
  props: ["employeeCodeDelete"],
  methods: {
    /**
     * Mô tả: Hàm gọi sự kiện xóa nhân viên khi người dùng chọn có trong component cha (EmployeeList)
     * created by : BNTIEN
     * created date: 29-05-2023 08:33:41
     */
    btnConfirmYesDeleteEmployee() {
      this.$emit("confirmYesDeleteEmployee");
    },
    /**
     * Mô tả: Hàm gọi sự kiện hủy xóa nhân viên khi người dùng chọn không trong component cha (EmployeeList)
     * created by : BNTIEN
     * created date: 29-05-2023 08:35:00
     */
    btnConfirmNoDeleteEmployee() {
      this.$emit("confirmNoDeleteEmployee");
    },
  },
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
