<template>
  <div class="content-title">
    <h1>Nhân viên</h1>
    <button id="btn-add" class="btn btn-default" @click="onOpenFormDetail">
      <div class="text">Thêm nhân viên mới</div>
    </button>
  </div>
  <div class="content-main-body">
    <div class="content-action">
      <div class="search-employee">
        <input
          type="search"
          placeholder="Tìm theo mã, tên nhân viên"
          name="search-employee"
          id="search-employee"
        />
        <div class="search-icon icon-tb"></div>
      </div>
      <div
        @click="refreshData"
        class="refresh-icon icon-tb"
        id="btn-refresh"
      ></div>
    </div>
    <div id="list-employee" class="list-employee">
      <form action="">
        <table id="tbEmployeeList">
          <thead>
            <tr>
              <th type="checkbox" class="employee-border-left">
                <input
                  class="checkbox-select-row"
                  type="checkbox"
                  name=""
                  id=""
                  model-name="CheckboxSTT"
                />
              </th>
              <th class="e-id" model-name="EmployeeCode">MÃ NHÂN VIÊN</th>
              <th model-name="FullName">TÊN NHÂN VIÊN</th>
              <th class="e-id" model-name="GenderName">GIỚI TÍNH</th>
              <th
                type="date"
                class="text-center e-birthday"
                model-name="DateOfBirth"
              >
                NGÀY SINH
              </th>
              <th>
                <span title="Số chứng minh nhân dân" model-name="CMND"
                  >Số CMND</span
                >
              </th>
              <th model-name="TitleJob">CHỨC DANH</th>
              <th model-name="DepartmentName">TÊN ĐƠN VỊ</th>
              <th model-name="AccountNumber">SỐ TÀI KHOẢN</th>
              <th model-name="BankName">TÊN NGÂN HÀNG</th>
              <th model-name="BranchBank" title="Chi nhánh tài khoản ngân hàng">
                CHI NHÁNH TK NGÂN HÀNG
              </th>
              <th
                type="feat"
                class="text-center employee-border-right e-birthday"
              >
                CHỨC NĂNG
              </th>
            </tr>
          </thead>
          <!-- Kiểm tra list employees có rỗng hay không, nếu không rỗng mới hiển thị lên table -->
          <tbody v-if="employees.length > 0">
            <tr v-for="(item, index) in employees" :key="index">
              <td class="employee-border-left">
                <input
                  class="checkbox-select-row"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td class="e-id">{{ item.EmployeeCode }}</td>
              <td>{{ item.FullName }}</td>
              <td class="e-id">{{ item.GenderName }}</td>
              <td class="text-center e-birthday">
                {{ formatDate(item.DateOfBirth) }}
              </td>
              <td>043436894</td>
              <td>Trưởng Nhóm</td>
              <td>{{ item.DepartmentName }}</td>
              <td>0549330586229</td>
              <td>Vietcombank</td>
              <td>Thanh Hóa</td>
              <td
                class="text-center employee-border-right e-birthday"
                id="function-table"
              >
                <span @click="btnUpdateFormDetail(item)">Sửa</span>
                <div
                  class="function-table-content"
                  @click="btnShowColFeature(index)"
                >
                  <div class="function-icon-table function-icon-select">
                    <ul
                      class="menu-function-select"
                      v-show="isShowColFeature[index]"
                    >
                      <li>Nhân bản</li>
                      <li
                        class="menu-function-select-delete-employee"
                        @click="onDeleteEmployee(item.EmployeeId)"
                      >
                        Xóa
                      </li>
                      <li>Ngừng sử dụng</li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- <tbody v-else>
            <tr>
              <td class="employee-border-left">
                <input
                  class="checkbox-select-row"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td class="e-id">oke</td>
              <td>Oke Tiến</td>
              <td class="e-id">Nam</td>
              <td class="text-center e-birthday">1/2/2020</td>
              <td>043436894</td>
              <td>Trưởng Nhóm</td>
              <td>oke dv</td>
              <td>0549330586229</td>
              <td>Vietcombank</td>
              <td>Thanh Hóa</td>
              <td
                class="text-center employee-border-right e-birthday"
                id="function-table"
              >
                <span @click="btnUpdateFormDetail(0)">Sửa</span>
                <div
                  class="function-table-content"
                  @click="btnShowColFeature(0)"
                >
                  <div class="function-icon-table function-icon-select">
                    <ul
                      class="menu-function-select"
                      v-show="isShowColFeature[0]"
                    >
                      <li>Nhân bản</li>
                      <li class="menu-function-select-delete-employee">Xóa</li>
                      <li>Ngừng sử dụng</li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody> -->
        </table>
      </form>
    </div>
    <div id="pagination" class="pagination">
      <p>Tổng số: <b>1035</b> bản ghi</p>
      <div class="pagination-detail">
        <div class="pagination-detail-pagesize">
          <div
            id="pagination-detail-pagesize-content"
            class="pagination-detail-pagesize-content"
          >
            {{ selectedRecord }} bản ghi trên trang
          </div>
          <div
            id="menu-paging-select"
            class="menu-paging-select"
            @click="btnShowSelectPaging"
          >
            <div
              class="function-icon"
              :class="{ 'rotate-function-icon': isShowPaging }"
            ></div>
            <ul id="menu-paging" class="menu-paging" v-show="isShowPaging">
              <li
                class="menu-paging-record"
                v-for="(record, index) in recordOptions"
                :key="index"
                @click="onSelectedRecord(record)"
              >
                {{ record }} bản ghi trên trang
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul class="page-number">
            <li>Trước</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>Sau</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- employee detail -->
    <EmployeeDetail
      @closeFormDetail="onCloseFormDetail"
      v-if="isShowFormDetail"
      :employeeSelected="employeeUpdate"
    ></EmployeeDetail>
    <div
      id="container-overlay"
      class="container-overlay"
      @closeFormDetail="onCloseFormDetail"
      v-if="isOverlay"
    ></div>
    <!-- dialog employee confirm delete -->
    <misa-dialog-employee-confirm-delete
      :employeeIdDelete="employeeIdDeleteSelected"
      @confirmYesDeleteEmployee="onConfirmYesDeleteEmployee"
      @confirmNoDeleteEmployee="onConfirmNoDeleteEmployee"
      v-if="isShowDialogConfirmDelete"
    ></misa-dialog-employee-confirm-delete>
  </div>
</template>

<script>
import EmployeeDetail from "./EmployeeDetail.vue";
import axios from "axios";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của form chi tiết
      isShowFormDetail: false,
      // Khai báo biến quy định trạng thái hiển thị overlay
      isOverlay: false,
      // Khai báo mảng quy định trạng thái hiển thị của các chức năng ở cột cuối của table
      isShowColFeature: [],
      // Khai báo biến quy định trạng thái hiển thị của các item select paging
      isShowPaging: false,
      // Khai báo list employee
      employees: [],
      // Khai báo 1 nhân viên được chọn để xử lí hàm sửa
      employeeUpdate: {},
      // Khai báo số bản ghi mặc định được hiển thi trên table
      selectedRecord: "20",
      // Khai báo list số bản ghi có thể lựa chọn để hiển thị trên trang
      recordOptions: ["10", "20", "30", "50", "100"],
      // Khai báo EmployeeId của nhân viên cần xóa
      employeeIdDeleteSelected: "",
      // Khai báo biến quy định trạng thái ẩn hiển dialog confirm delete
      isShowDialogConfirmDelete: false,
    };
  },
  created() {
    this.getListEmployee();
  },
  methods: {
    // Hàm xử lí sự kiên mở form chi tiết khi click vào button thêm mới nhân viên
    onOpenFormDetail() {
      this.isShowFormDetail = true;
      this.isOverlay = true;
    },
    // Hàm xử lí sự kiện khi click vào nút close trong form chi tiết
    onCloseFormDetail() {
      this.isShowFormDetail = false;
      this.isOverlay = false;
    },
    // Hàm xử lí sự kiện đóng mở các item ở cột cuối của table khi click vào icon drop
    btnShowColFeature(index) {
      this.isShowColFeature[index] = !this.isShowColFeature[index];
    },
    // Hàm xử lí sự kiện đóng mở lựa chọn số phần tử hiển thị trên 1 trang trong table
    btnShowSelectPaging() {
      this.isShowPaging = !this.isShowPaging;
    },
    // Hàm call dữ liệu nhân viên từ api
    async getListEmployee() {
      try {
        await axios
          .get(`https://cukcuk.manhnv.net/api/v1/Employees`)
          .then((res) => (this.employees = res?.data));
      } catch (error) {
        console.log(error);
      }
    },
    // Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
    refreshData() {
      // Xử lí sau
      location.reload();
    },
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
    // Hàm xử lí cập nhật thông tin nhân viên
    btnUpdateFormDetail(employee) {
      this.employeeUpdate = employee;
      this.isShowFormDetail = true;
      this.isOverlay = true;
    },
    // Hàm xử lí sự kiện click vào các item lựa chọn số bản ghi hiển thị trên table
    onSelectedRecord(record) {
      this.selectedRecord = record;
    },
    // Hàm xử lí sự kiện khi bấm vào item xóa nhân viên thì hiển thị dialog xác nhận xóa
    onDeleteEmployee(employeeId) {
      this.isShowDialogConfirmDelete = true;
      this.isOverlay = true;
      this.employeeIdDeleteSelected = employeeId;
    },
    // Hàm xử lí sự kiện khi click vào button có trong dialog xác nhận xóa
    async onConfirmYesDeleteEmployee() {
      try {
        await axios.delete(
          `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdDeleteSelected}`
        );
        this.isShowDialogConfirmDelete = false;
        this.isOverlay = false;
        // Sau khi xóa gọi lại api lấy danh sách nhân viên
        this.getListEmployee();
      } catch (error) {
        console.log(error);
      }
    },
    // Hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa
    onConfirmNoDeleteEmployee() {
      this.isShowDialogConfirmDelete = false;
      this.isOverlay = false;
    },
  },
};
</script>

<style scoped>
@import url(@/css/maincontent.css);
@import url(@/css/pagingemployee.css);
#function-table span:hover {
  cursor: pointer;
}
.rotate-function-icon {
  transform: rotate(180deg);
}
</style>
