<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-delete-employee"
  >
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>Bạn có thực sự muốn xóa nhân viên &lt;000579&gt; không?</p>
      </div>
    </div>
    <div class="dialog-warning-delete-footer">
      <button class="btn btn-extra" id="btn-warning-delete-employee-no">
        <div class="text-extra">Không</div>
      </button>
      <button
        class="btn btn-default btn-no-minwwidth"
        id="btn-warning-delete-employee-yes"
      >
        <div class="text">Có</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeConfirmDelete",
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
