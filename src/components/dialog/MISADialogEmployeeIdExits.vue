<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-employee"
  >
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>
          Mã nhân viên &lt;NV-0001&gt; đã tồn tại trong hệ thống, vui lòng kiểm
          tra lại.
        </p>
      </div>
    </div>
    <div class="dialog-warning-footer">
      <misa-button-default :textButton="'Đồng ý'"></misa-button-default>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeIdExits",
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
