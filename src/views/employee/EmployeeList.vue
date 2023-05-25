<template>
  <div class="content-title">
    <h1>Nhân viên</h1>
    <button id="btn-add" class="btn btn-default">
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
      <div class="refresh-icon icon-tb" id="btn-refresh"></div>
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
            <tr>
              <td class="employee-border-left">
                <input
                  class="checkbox-select-row"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td class="e-id">0001</td>
              <td>Bùi Ngọc Tiến</td>
              <td class="e-id">Nam</td>
              <td class="text-center e-birthday">31/12/1969</td>
              <td>043436894</td>
              <td>Trưởng Nhóm</td>
              <td>Xay Keo - Phối Trộn</td>
              <td>0549330586229</td>
              <td>Vietcombank</td>
              <td>Thanh Hóa</td>
              <td
                class="text-center employee-border-right e-birthday"
                id="function-table"
              >
                <span>Sửa</span>
                <div class="function-table-content">
                  <div class="function-icon-table function-icon-select">
                    <ul class="menu-function-select">
                      <li>Nhân bản</li>
                      <li class="menu-function-select-delete-employee">Xóa</li>
                      <li>Ngừng sử dụng</li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="employee-border-left">
                <input
                  class="checkbox-select-row"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td class="e-id">0002</td>
              <td>Nguyễn Văn Mạnh</td>
              <td class="e-id">Nam</td>
              <td class="text-center e-birthday">31/12/1969</td>
              <td>043436894</td>
              <td>Trưởng Nhóm</td>
              <td>Xay Keo - Phối Trộn</td>
              <td>0549330586229</td>
              <td>ACB</td>
              <td>Hà Nội</td>
              <td
                class="text-center employee-border-right e-birthday"
                id="function-table"
              >
                <span>Sửa</span>
                <div class="function-table-content">
                  <div class="function-icon-table function-icon-select">
                    <ul class="menu-function-select">
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
          <div id="menu-paging-select" class="menu-paging-select">
            <div class="function-icon"></div>
            <ul id="menu-paging" class="menu-paging">
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
  </div>
</template>

<script>
export default {
  name: "EmployeeList",
};
</script>

<style>
@import url(@/css/maincontent.css);
@import url(@/css/pagingemployee.css);
</style>
