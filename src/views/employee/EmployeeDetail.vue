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
            <misa-input
              ref="codeEmployee"
              v-model="employee.EmployeeCode"
              :class="{
                'border-red': isBorderRed.Code && !employee.EmployeeCode,
              }"
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Tên <span class="s-require">*</span></label>
            <misa-input
              ref="nameEmployee"
              v-model="employee.FullName"
              :class="{ 'border-red': isBorderRed.Name && !employee.FullName }"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-n">
            <label>Ngày sinh</label>
            <misa-input
              v-model="employee.DateOfBirth"
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
                @change="selectGender('Nam')"
              />
              <span>Nam</span>
              <input
                type="radio"
                name="gender"
                :checked="employee.GenderName === 'Nữ'"
                @change="selectGender('Nữ')"
              />
              <span>Nữ</span>
              <input
                type="radio"
                name="gender"
                :checked="
                  employee.GenderName !== 'Nam' && employee.GenderName !== 'Nữ'
                "
                @change="selectGender('Bê đê')"
              />
              <span>Khác</span>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l" style="position: relative">
            <label>Đơn vị <span class="s-require">*</span></label>
            <div
              class="e-cbb"
              id="e-cbb"
              :class="{ 'border-red': isBorderRed.Unit && !employee.UnitName }"
            >
              <div class="e-textfield-cbb">
                <misa-input
                  ref="unitEmployee"
                  placeholder="-- Chọn Đơn Vị --"
                  v-model="employee.UnitName"
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
                  @click="onSelectedUnit(unit.UnitName)"
                >
                  {{ unit.UnitName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-tb">
            <label title="Số chứng minh nhân dân">Số CMND</label>
            <misa-input v-model="employee.CMNDNumber"></misa-input>
          </div>
          <div class="col-md-n">
            <label>Ngày cấp</label>
            <misa-input
              placeholder="dd/mm/yyyy"
              v-model="employee.CMNDDate"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Chức danh</label>
            <misa-input v-model="employee.TitleProfessional"></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Nơi cấp</label>
            <misa-input v-model="employee.CMNDAddress"></misa-input>
          </div>
        </div>
        <div class="full-content" id="content-null"></div>
        <div class="full-content">
          <label>Địa chỉ</label>
          <misa-input v-model="employee.EmployeeAddress"></misa-input>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label title="Điện thoại di động">ĐT di động</label>
              <misa-input v-model="employee.PhoneNumber"></misa-input>
            </div>
            <div class="col-md-quater">
              <label title="Điện thoại cố định">ĐT cố định</label>
              <misa-input v-model="employee.PhoneLandline"></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Email</label>
              <misa-input v-model="employee.Email"></misa-input>
            </div>
          </div>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label>Tài khoản ngân hàng</label>
              <misa-input v-model="employee.BankAccount"></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Tên ngân hàng</label>
              <misa-input v-model="employee.BankName"></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Chi nhánh</label>
              <misa-input v-model="employee.BankBranch"></misa-input>
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
    <!-- dialog employee id exits -->
    <misa-dialog-employee-id-exits
      :textEmployeeIdExits="contentEmployeeIdExits"
      v-if="isShowDialogIdExits"
      @closeDialogIdExits="onCloseDialogIdExits"
    ></misa-dialog-employee-id-exits>
    <!-- dialog employee save and close -->
    <misa-dialog-employee-save-and-close
      v-if="isShowDialogDataChange"
      @cancelDialogDataChange="onCancelDialogDataChange"
      @noDialogDataChange="onNoDialogDataChange"
      @yesDialogDataChange="onYesDialogDataChange"
    ></misa-dialog-employee-save-and-close>
    <!-- toast mesage -->
    <misa-toast-message
      v-if="isShowToastMessage"
      :contentToast="contentToastSuccess"
      @closeToastMessage="btnCloseToastMessage"
    ></misa-toast-message>
  </div>
</template>

<script>
import { formatDate } from "@/js/formatData.js";
import apiEmployeemanage from "@/js/apiService";
import { tableDataManageEmployee } from "@/common/tableData.js";
import { textAttributeEmployee } from "@/common/attributeEmployee.js";
import { CHECK_STATUS } from "@/common/apiStatus";
export default {
  name: "EmployeeDetail",
  props: ["employeeSelected", "statusEdit"],
  created() {
    this.loadData();
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
      // Khai báo biến xác định nội dung trường nào k được để trống
      dataNotNull: "",
      // Khai báo trạng thái hiển thị của dialog cảnh báo mã nhân viên đã tồn tại
      isShowDialogIdExits: false,
      // Khai báo biến xác định thông tin của mã nhân viên đã tồn tại
      contentEmployeeIdExits: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: { Code: false, Name: false, Unit: false },
      // Khai báo biến xác định trạng thái hiển thị của toast message
      isShowToastMessage: false,
      // Khai báo nội dung toast message
      contentToastSuccess: "",
    };
  },
  // computed: {
  //   formattedDateBirth: {
  //     get() {
  //       return this.formatDate(this.employee.DateOfBirth) !==
  //         textAttributeEmployee.DATE_NaN
  //         ? this.formatDate(this.employee.DateOfBirth)
  //         : "";
  //     },
  //     set(value) {
  //       this.employee.DateOfBirth = value;
  //     },
  //   },
  //   formattedDateCMND: {
  //     get() {
  //       return this.formatDate(this.employee.CMNDDate) !==
  //         textAttributeEmployee.DATE_NaN
  //         ? this.formatDate(this.employee.CMNDDate)
  //         : "";
  //     },
  //     set(value) {
  //       this.employee.CMNDDate = value;
  //     },
  //   },
  // },
  methods: {
    /**
     * Mô tả: Hàm lấy danh sách department từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:10
     */
    async getListUnit() {
      try {
        const res = await apiEmployeemanage.getListAllObject(
          `/${tableDataManageEmployee.UNIT}`
        );
        this.listUnit = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả: gọi api lấy dữ liệu
     * created by : BNTIEN
     * created date: 30-05-2023 14:57:33
     */
    loadData() {
      this.getListUnit();
      if (!this.statusEdit) {
        this.employee = {};
      } else {
        try {
          // Chuyển đối tượng sang chuỗi json
          let res = JSON.stringify(this.employeeSelected);
          // Chuyển đổi chuỗi json thành đối tượng employee
          this.employee = JSON.parse(res);
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Mô tả: Tái sử dụng hàm formatDate
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:16
     */
    formatDate: formatDate,
    /**
     * Mô tả: Hàm sử lí sự kiện khi click vào icon close
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:28
     */
    btnCloseFormDetail() {
      // Gọi sự kiện đóng form chi tiết từ component cha (EmployeeList)
      this.$emit("closeFormDetail");
    },
    /**
     * Mô tả: Hàm xử lí sự kiện ẩn hiện options chọn đơn vị
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:42
     */
    btnShowSelectUnit() {
      this.isShowSelectUnit = !this.isShowSelectUnit;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn đơn vị
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedUnit(unit) {
      this.employee.UnitName = unit;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    onBtnClose() {
      if (
        JSON.stringify(this.employeeSelected) !== JSON.stringify(this.employee)
      ) {
        this.isShowDialogDataChange = true;
      } else {
        this.btnCloseFormDetail();
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:23
     */
    async onBtnSaveAndClose() {
      try {
        // Kiểm tra xem các trường bắt buộc đã được nhập dữ liệu chưa, nếu chưa thì thông báo cho người dùng
        if (!this.employee.EmployeeCode) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull = textAttributeEmployee.CODE;
          this.isBorderRed.Code = true;
          return;
        }
        if (!this.employee.FullName) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull = textAttributeEmployee.NAME;
          this.isBorderRed.Name = true;
          return;
        }
        if (!this.employee.UnitName) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull = textAttributeEmployee.UNIT;
          this.isBorderRed.Unit = true;
          return;
        }
        // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
        let employeeById = {};
        const res = await apiEmployeemanage.getObjectById(
          `/${tableDataManageEmployee.EMPLOYEE}`,
          `/${this.employee.EmployeeCode}`
        );
        employeeById = res.data;
        if (!employeeById) {
          // Nếu mã nhân viên chưa tồn tại trong hệ thống
          let unitAdd = this.listUnit.find(
            (unit) => unit.UnitName === this.employee.UnitName
          );
          this.employee.UnitID = unitAdd.UnitID;
          const res = await apiEmployeemanage.postObject(
            `/${tableDataManageEmployee.EMPLOYEE}`,
            this.employee
          );
          if (CHECK_STATUS.isResponseStatusOk(res.status)) {
            this.contentToastSuccess = textAttributeEmployee.SUCCESS_CTEATE;
            this.isShowToastMessage = true;
            this.employee = {};
          }
        } else {
          // Nếu mã nhân viên đã tồn tại trong hệ thống
          this.isShowDialogIdExits = true;
          this.contentEmployeeIdExits = employeeById.EmployeeCode;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả: Hàm đóng dialog cảnh báo dữ liệu k được để trống và focus vào các ô trống
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:59
     */
    onCloseBtnSaveAndClose() {
      this.isShowDialogDataNotNull = false;
      if (!this.employee.EmployeeCode) {
        this.$refs.codeEmployee.$el.focus();
        return;
      }
      if (!this.employee.FullName) {
        this.$refs.nameEmployee.$el.focus();
        return;
      }
      if (!this.employee.UnitName) {
        this.$refs.unitEmployee.$el.focus();
        return;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào nút hủy trong form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:20
     */
    onBtnCancel() {
      this.btnCloseFormDetail();
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng dialog cảnh báo mã nhân viên đã tồn tại
     * created by : BNTIEN
     * created date: 29-05-2023 08:28:19
     */
    onCloseDialogIdExits() {
      this.isShowDialogIdExits = false;
    },
    /**
     * Mô tả: Xử lí xem radio giới tính nào được chọn
     * created by : BNTIEN
     * created date: 30-05-2023 22:32:23
     */
    selectGender(gender) {
      this.employee.GenderName = gender;
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button hủy trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:40:13
     */
    onCancelDialogDataChange() {
      this.isShowDialogDataChange = false;
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button không trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:42:10
     */
    onNoDialogDataChange() {
      this.btnCloseFormDetail();
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button có trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:43:38
     */
    async onYesDialogDataChange() {
      try {
        const res = await apiEmployeemanage.putObject(
          `/${tableDataManageEmployee.EMPLOYEE}`,
          this.employee
        );
        this.btnCloseFormDetail();
        if (CHECK_STATUS.isResponseStatusOk(res.status)) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện đóng toast message
     * created by : BNTIEN
     * created date: 31-05-2023 01:15:51
     */
    btnCloseToastMessage() {
      this.isShowToastMessage = false;
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

.e-textfield-cbb input:focus {
  border: none;
}

.border-red {
  border: 1px solid red;
}

.toast-success {
  top: -50px;
}
</style>
