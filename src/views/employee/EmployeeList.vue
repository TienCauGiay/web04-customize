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
          <tbody>
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
                      <li class="menu-function-select-delete-employee">Xóa</li>
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
            20 bản ghi trên trang
          </div>
          <div
            id="menu-paging-select"
            class="menu-paging-select"
            @click="btnShowSelectPaging"
          >
            <div class="function-icon"></div>
            <ul id="menu-paging" class="menu-paging" v-show="isShowPaging">
              <li class="menu-paging-record">10 bản ghi trên trang</li>
              <li class="menu-paging-record">20 bản ghi trên trang</li>
              <li class="menu-paging-record">30 bản ghi trên trang</li>
              <li class="menu-paging-record">50 bản ghi trên trang</li>
              <li class="menu-paging-record">100 bản ghi trên trang</li>
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
    ></EmployeeDetail>
    <div
      id="container-overlay"
      class="container-overlay"
      @closeFormDetail="onCloseFormDetail"
      v-if="isShowFormDetail"
    ></div>
  </div>
</template>

<script>
import EmployeeDetail from "./EmployeeDetail.vue";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của form chi tiết
      isShowFormDetail: false,
      // Khai báo mảng quy định trạng thái hiển thị của các chức năng ở cột cuối của table
      isShowColFeature: [],
      // Khai báo biến quy định trạng thái hiển thị của các item select paging
      isShowPaging: false,
      // Khai báo list employee
      employees: [],
    };
  },
  created() {
    fetch("https://cukcuk.manhnv.net/api/v1/Employees")
      .then((res) => res.json())
      .then((data) => {
        this.employees = data;
      });
  },
  methods: {
    // Hàm xử lí sự kiên mở form chi tiết khi click vào button thêm mới nhân viên
    onOpenFormDetail() {
      this.isShowFormDetail = true;
    },
    // Hàm xử lí sự kiện khí click vào nút close trong form chi tiết
    onCloseFormDetail() {
      this.isShowFormDetail = false;
    },
    // Hàm xử lí sự kiện đóng mở các item ở cột cuối của table khi click vào icon drop
    btnShowColFeature(index) {
      this.isShowColFeature[index] = !this.isShowColFeature[index];
    },
    // Hàm xử lí sự kiện đóng mở lựa chọn số phần tử hiển thị trên 1 trang trong table
    btnShowSelectPaging() {
      this.isShowPaging = !this.isShowPaging;
    },
    // Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
    refreshData() {
      // Xử lí sau
      // location.reload();
    },
    // Hàm xử lí định dạng ngày tháng năm
    formatDate(value) {
      let date = new Date(value);
      let day = date.getDay().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style>
@import url(@/css/maincontent.css);
@import url(@/css/pagingemployee.css);
</style>
