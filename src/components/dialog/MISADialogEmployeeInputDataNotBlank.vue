<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-danger-employee"
  >
    <div class="dialog-content">
      <div class="danger-red-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p id="dialog-content-main-notnull">Tên không được để trống.</p>
      </div>
    </div>
    <div class="dialog-danger-footer">
      <button class="btn btn-default" id="btn-danger-employee-close">
        <div class="text">Đóng</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeInputDataNotBlank",
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
