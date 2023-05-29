<template>
  <div class="content-title">
    <h1>Nhân viên</h1>
    <misa-button-default
      :textButton="'Thêm mới nhân viên'"
      @click="onOpenFormDetail"
    ></misa-button-default>
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
            <tr
              v-for="item in employees"
              :key="item.EmployeeId"
              @dblclick="btnUpdateFormDetail(item)"
            >
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
                <span>Sửa</span>
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
      :statusEdit="isStatusEdit"
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
import { formatDate } from "@/js/formatData.js";
import { getEmployeeById, getAllEmployee } from "@/js/employee.js";
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
      employees: [
        {
          EmployeeCode: "NV-001",
          FullName: "Bùi Ngọc Tiến",
          GenderName: "Nam",
          DateOfBirth: "2023-05-09T00:00:00",
        },
        {
          EmployeeCode: "NV-002",
          FullName: "Bùi Duyên",
          GenderName: "Nữ",
          DateOfBirth: "2020-06-02T00:00:00",
        },
        {
          EmployeeCode: "NV-003",
          FullName: "Bùi Tuyên",
          GenderName: "",
          DateOfBirth: "1970-05-01T00:00:00",
        },
      ],
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
      // Khai báo biến kiểm tra xem form chi tiết đang ở trạng thái thêm hay sửa
      isStatusEdit: false,
    };
  },
  created() {
    this.getListEmployee();
  },
  methods: {
    /**
     * Mô tả: Tái sử dụng hàm formatDate
     * created by : BNTIEN
     * created date: 29-05-2023 09:48:39
     */
    formatDate: formatDate,
    /**
     * Mô tả: Hàm xử lí sự kiên mở form chi tiết khi click vào button thêm mới nhân viên
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:01
     */
    onOpenFormDetail() {
      this.isShowFormDetail = true;
      this.isOverlay = true;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào nút close trong form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:35
     */
    onCloseFormDetail() {
      this.isShowFormDetail = false;
      this.isOverlay = false;
      this.isStatusEdit = false;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở các item ở cột cuối của table khi click vào icon drop
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:54
     */
    btnShowColFeature(index) {
      this.isShowColFeature[index] = !this.isShowColFeature[index];
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở lựa chọn số phần tử hiển thị trên 1 trang trong table
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:05
     */
    btnShowSelectPaging() {
      this.isShowPaging = !this.isShowPaging;
    },
    /**
     * Mô tả: Hàm lấy dữ liệu nhân viên từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:20
     */
    async getListEmployee() {
      const res = await getAllEmployee();
      this.employees = res.data;
    },
    /**
     * Mô tả: Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:31
     */
    refreshData() {
      location.reload();
    },
    /**
     * Mô tả: Hàm xử lí cập nhật thông tin nhân viên
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:56
     */
    btnUpdateFormDetail(employee) {
      this.employeeUpdate = employee;
      this.isShowFormDetail = true;
      this.isOverlay = true;
      this.isStatusEdit = true;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện click vào các item lựa chọn số bản ghi hiển thị trên table
     * created by : BNTIEN
     * created date: 29-05-2023 07:50:06
     */
    onSelectedRecord(record) {
      this.selectedRecord = record;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào item xóa nhân viên thì hiển thị dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 29-05-2023 07:50:15
     */
    onDeleteEmployee(employeeId) {
      this.isShowDialogConfirmDelete = true;
      this.isOverlay = true;
      this.employeeIdDeleteSelected = employeeId;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng xác nhận xóa
     * created by : BNTIEN
     * created date: 28-05-2023 21:09:01
     */
    async onConfirmYesDeleteEmployee() {
      const res = await getEmployeeById(this.employeeIdDeleteSelected);
      if (res.status === 200) {
        this.isShowDialogConfirmDelete = false;
        this.isOverlay = false;
      }
      // Sau khi xóa gọi lại api lấy danh sách nhân viên
      this.getListEmployee();
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 29-05-2023 07:51:41
     */
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

tr:hover {
  background-color: #e7f5ec;
  cursor: pointer;
}
</style>
