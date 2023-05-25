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
        <button class="btn btn-extra btn-no-minwwidth">
          <div class="text-extra">Hủy</div>
        </button>
      </div>
      <div class="dialog-question-footer-right">
        <button class="btn btn-extra" id="btn-dialog-question-employee-no">
          <div class="text-extra">Không</div>
        </button>
        <button class="btn btn-default btn-no-minwwidth">
          <div class="text">Có</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogEmployeeSaveAndClose",
};
</script>

<style>
@import url(@/css/components/dialog.css);
</style>
