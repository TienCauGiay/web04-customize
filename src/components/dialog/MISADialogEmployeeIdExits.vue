<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-employee"
  >
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>
          Mã nhân viên &lt;{{ this.textEmployeeIdExits }}&gt; đã tồn tại trong
          hệ thống, vui lòng kiểm tra lại.
        </p>
      </div>
    </div>
    <div class="dialog-warning-footer">
      <misa-button-default
        :textButton="'Đồng ý'"
        @click="btnCloseDialogIdExits"
      ></misa-button-default>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeIdExits",
  props: ["textEmployeeIdExits"],
  methods: {
    /**
     * Mô tả: Hàm gọi sự kiện đóng dialog mã nhân viên đã tồn tại từ component cha (EmployeeDetail)
     * created by : BNTIEN
     * created date: 29-05-2023 08:32:41
     */
    btnCloseDialogIdExits() {
      this.$emit("closeDialogIdExits");
    },
  },
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
