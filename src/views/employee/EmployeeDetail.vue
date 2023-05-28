<template>
  <div id="detail-info-employee" class="position-display-center">
    <div class="employee-toolbar">
      <div class="question-icon icon-tb"></div>
      <div
        @click="btnCloseFormDetail"
        class="close-icon icon-tb"
        id="employee-exit"
      ></div>
    </div>
    <div class="employee-main">
      <div class="employee-title">
        <p><b>THÔNG TIN NHÂN VIÊN</b></p>
        <div class="employee-check">
          <input type="checkbox" />
          <span>Là khách hàng</span>
        </div>
        <div class="employee-check">
          <input type="checkbox" />
          <span>Là nhà cung cấp</span>
        </div>
      </div>
      <div class="employee-content">
        <div class="half-content">
          <div class="col-md-n">
            <label>Mã <span class="s-require">*</span></label>
            <misa-input></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Tên <span class="s-require">*</span></label>
            <misa-input></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-n">
            <label>Ngày sinh</label>
            <input type="date" class="textfield e-textfield" name="" />
          </div>
          <div class="col-md-tb">
            <label>Giới tính</label>
            <div class="e-gender">
              <input type="radio" name="gender" />
              <span>Nam</span>
              <input type="radio" name="gender" />
              <span>Nữ</span>
              <input type="radio" name="gender" />
              <span>Khác</span>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l" style="position: relative">
            <label>Đơn vị <span class="s-require">*</span></label>
            <div class="e-cbb" id="e-cbb">
              <div class="e-textfield-cbb">
                <misa-input
                  placeholder="-- Chọn Đơn Vị --"
                  :value="selectedUnit"
                ></misa-input>
              </div>
              <i class="function-icon" @click="btnShowSelectUnit"></i>
            </div>
            <div
              class="col-md-l select-unit"
              :class="{ 'select-unit-block': isShowSelectUnit }"
            >
              <ul v-show="isShowSelectUnit" @click="btnShowSelectUnit">
                <li
                  v-for="(unit, index) in listUnit"
                  :key="index"
                  @click="onSelectedUnit(unit)"
                >
                  {{ unit }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-tb">
            <label title="Số chứng minh nhân dân">Số CMND</label>
            <misa-input></misa-input>
          </div>
          <div class="col-md-n">
            <label>Ngày cấp</label>
            <input type="date" class="textfield e-textfield" name="" />
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Chức danh</label>
            <misa-input></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Nơi cấp</label>
            <misa-input></misa-input>
          </div>
        </div>
        <div class="full-content" id="content-null"></div>
        <div class="full-content">
          <label>Địa chỉ</label>
          <misa-input></misa-input>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label title="Điện thoại di động">ĐT di động</label>
              <misa-input></misa-input>
            </div>
            <div class="col-md-quater">
              <label title="Điện thoại cố định">ĐT cố định</label>
              <misa-input></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Email</label>
              <misa-input></misa-input>
            </div>
          </div>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label>Tài khoản ngân hàng</label>
              <misa-input></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Tên ngân hàng</label>
              <misa-input></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Chi nhánh</label>
              <misa-input></misa-input>
            </div>
          </div>
        </div>
      </div>
      <div class="employee-action">
        <div class="action-left">
          <button class="btn btn-extra">Hủy</button>
        </div>
        <div class="action-right">
          <button class="btn btn-extra" @click="onBtnSave">Cất</button>
          <button id="btn-add-save" class="btn btn-default text">
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeDetail",
  props: ["employeeSelected"],
  created() {
    // Chuyển đối tượng sang chuỗi json
    let res = JSON.stringify(this.employeeSelected);
    // Chuyển đổi chuỗi json thành đối tượng employee
    this.employee = JSON.parse(res);
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của combobox chọn đơn vị
      isShowSelectUnit: false,
      // Khai báo đối tượng employee
      employee: {},
      // Khai báo đơn vị được chọn
      selectedUnit: "",
      // Khai báo danh sách các đơn vị
      listUnit: [
        "Phòng Công Nghệ Thông Tin",
        "Phòng Đào Tạo",
        "Phòng Kế Toán",
        "Phòng Nhân Sự",
        "Phòng Hành Chính",
      ],
    };
  },
  methods: {
    // Hàm sử lí sự kiện khi click vào icon close
    btnCloseFormDetail() {
      // Gọi sự kiện đóng form chi tiết từ component cha (EmployeeList)
      this.$emit("closeFormDetail");
    },
    // Hàm xử lí sự kiện ẩn hiện options chọn đơn vị
    btnShowSelectUnit() {
      this.isShowSelectUnit = !this.isShowSelectUnit;
    },
    // Hàm sử lí sự kiện khi người dùng chọn đơn vị
    onSelectedUnit(unit) {
      this.selectedUnit = unit;
    },
    // Hàm sử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
    onBtnSave() {
      alert(this.employee.EmployeeCode, this.employee.FullName);
    },
  },
};
</script>

<style scoped>
@import url(@/css/detailinfoemployee.css);

i:hover {
  cursor: pointer;
}

.select-unit-block {
  background-color: #fff;
  border: 1px solid var(--color-border-default);
  z-index: 100;
}

.e-textfield-cbb input {
  background-color: white;
}

.e-textfield-cbb input:hover {
  background-color: white;
}
</style>
