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
            <misa-input v-model="employee.EmployeeCode"></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Tên <span class="s-require">*</span></label>
            <misa-input v-model="employee.FullName"></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-n">
            <label>Ngày sinh</label>
            <misa-input
              v-model="formattedDate"
              placeholder="dd/mm/yyyy"
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Giới tính</label>
            <div class="e-gender">
              <input
                type="radio"
                name="gender"
                :checked="employee.GenderName === 'Nam'"
              />
              <span>Nam</span>
              <input
                type="radio"
                name="gender"
                :checked="employee.GenderName === 'Nữ'"
              />
              <span>Nữ</span>
              <input
                type="radio"
                name="gender"
                :checked="
                  employee.GenderName !== 'Nam' && employee.GenderName !== 'Nữ'
                "
              />
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
                  v-model="employee.DepartmentName"
                  disabled
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
                  @click="onSelectedUnit(unit.DepartmentName)"
                >
                  {{ unit.DepartmentName }}
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
            <misa-input
              v-model="employee.DateOfRelease"
              placeholder="dd/mm/yyyy"
            ></misa-input>
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
          <misa-button-extra
            :textButtonExtra="'Hủy'"
            @click="onBtnCancel"
          ></misa-button-extra>
        </div>
        <div class="action-right">
          <misa-button-extra
            :textButtonExtra="'Cất'"
            @click="onBtnClose"
          ></misa-button-extra>
          <misa-button-default
            :textButton="'Cất và thêm'"
            @click="onBtnSaveAndClose"
          ></misa-button-default>
        </div>
      </div>
    </div>
    <!-- dialog employee input data not blank -->
    <misa-dialog-employee-input-data-not-blank
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      @closeBtnSaveAndClose="onCloseBtnSaveAndClose"
    ></misa-dialog-employee-input-data-not-blank>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EmployeeDetail",
  props: ["employeeSelected"],
  created() {
    // Chuyển đối tượng sang chuỗi json
    let res = JSON.stringify(this.employeeSelected);
    // Chuyển đổi chuỗi json thành đối tượng employee
    this.employee = JSON.parse(res);
    this.getListDepartment();
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của combobox chọn đơn vị
      isShowSelectUnit: false,
      // Khai báo đối tượng employee
      employee: {},
      // Khai báo danh sách các đơn vị
      listUnit: [],
      // Khai báo trạng thái hiển thị của dialog cảnh báo dữ liệu k được để trống
      isShowDialogDataNotNull: false,
      // Khai báo biến xác định trường nào k được để trống
      dataNotNull: "",
    };
  },
  computed: {
    formattedDate: {
      get() {
        return this.formatDate(this.employee.DateOfBirth) !== "NaN/NaN/NaN"
          ? this.formatDate(this.employee.DateOfBirth)
          : "";
      },
      set(value) {
        this.employee.DateOfBirth = value;
      },
    },
  },
  methods: {
    // Hàm xử lí định dạng ngày tháng năm
    formatDate(value) {
      try {
        let date = new Date(value);
        let day = date.getDay().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
      } catch (error) {
        return "";
      }
    },
    // Hàm sử lí sự kiện khi click vào icon close
    btnCloseFormDetail() {
      // Gọi sự kiện đóng form chi tiết từ component cha (EmployeeList)
      this.$emit("closeFormDetail");
    },
    // Hàm xử lí sự kiện ẩn hiện options chọn đơn vị
    btnShowSelectUnit() {
      this.isShowSelectUnit = !this.isShowSelectUnit;
    },
    // Hàm xử lí sự kiện khi người dùng chọn đơn vị
    onSelectedUnit(unit) {
      this.employee.DepartmentName = unit;
    },
    // Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
    onBtnClose() {},
    // Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
    onBtnSaveAndClose() {
      this.isShowDialogDataNotNull = true;
      if (!this.employee.EmployeeCode) {
        this.dataNotNull = "Mã";
        return;
      }
      if (!this.employee.FullName) {
        this.dataNotNull = "Tên";
        return;
      }
      if (!this.employee.DepartmentName) {
        this.dataNotNull = "Đơn vị";
        return;
      }
    },
    // Hàm đóng dialog cảnh báo dữ liệu k được để trống
    onCloseBtnSaveAndClose() {
      this.isShowDialogDataNotNull = false;
    },
    // Hàm lấy danh sách department
    async getListDepartment() {
      try {
        await axios
          .get(`https://cukcuk.manhnv.net/api/v1/Departments`)
          .then((res) => (this.listUnit = res?.data));
      } catch (error) {
        console.log(error);
      }
    },
    // Hàm xử lí sự kiện khi click vào nút hủy trong form chi tiết
    onBtnCancel() {
      this.btnCloseFormDetail();
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
