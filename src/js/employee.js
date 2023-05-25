window.onload = function(){
    // Khởi tạo đối tượng employee
    new Employee();
}

class Employee{
    constructor(){
        this.initEvents();
        this.loadData();
    }

    /**
     * Khai báo các sự kiện
     * Author: BNTIEN (23/05/2023)
     */
    initEvents(){
        try {
            // Gọi hàm mở form thêm mới nhân viên
            document.getElementById("btn-add").onclick = this.openBtnAddNewEmployee;
            // Gọi hàm đóng form thêm mới nhân viên => hiển thị dialog question employee
            document.getElementById("employee-exit").onclick = this.closeFormEmployee;
            // Gọi hàm đóng form thêm mới nhân viên khi chon button không trong dialog question employee
            document.getElementById("btn-dialog-question-employee-no").onclick = this.closeFormEmployeeNo;
            // Gọi hàm đóng mở các lựa chọn ở cột cuối cùng của bảng nhân viên
            this.featureListEmployee();
            // Gọi hàm đóng mở số bản ghi trên 1 trang của table employee
            document.getElementById("menu-paging-select").onclick = this.selectPagingEmployee;
            // Gọi hàm set content cho paging
            this.setContentPagingEmployee();
            // Gọi hàm xử lí sự kiện khi bấm vào button cất và thêm trong form thêm mới nhân viên
            document.getElementById("btn-add-save").onclick = this.closeBtnAddAndSaveEmployee;
            // Gọi hàm xử lí sự kiện đóng dialog nhắc người dùng không được bỏ trống dữ liệu
            document.getElementById("btn-danger-employee-close").onclick = this.closeDialogDangerEmployee;
            // Gọi hàm xử lí sự kiện khi click vào item xóa nhân viên
            this.deleteEmployee();
            // Gọi hàm xử lí sự kiên khi click vào button có trong dialog xác nhận xóa nhân viên
            document.getElementById("btn-warning-delete-employee-yes").onclick = this.closeDialogWarningDeleleEmployeeYes;
            // Gọi hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa nhân viên
            document.getElementById("btn-warning-delete-employee-no").onclick = this.closeDialogWarningDeleleEmployeeNo;
            // Gọi hàm load lại toàn bộ dữ liệu khi click vào icon refresh
            document.getElementById("btn-refresh").onclick = this.refreshData;
        } catch (error) {
            
        }
    }

    /**
     * Load dữ liệu cho table
     * Author: BNTIEN (23/05/2023)
     */
    async loadData(){
        try {
            // Xóa dữ liệu cũ
            // document.querySelector("#tbEmployeeList tbody").innerHTML = "";
            // 1. Gọi api thực hiện lấy dữ liệu
            var data = await fetch("https://cukcuk.manhnv.net/api/v1/Employees").then(res => res.json());
            // 2. Hiển thị dữ liệu lên table
            // 3. Duyệt từng bản ghi trong mảng dữ liệu trả về
            for (const item of data) {
                // Tạo dòng dữ liệu tương ứng với từng bản ghi và append vào table
                // Tạo element tr tương ứng với các thông tin
                let trElement = document.createElement("tr");
                // Đọc header của table để lấy ra các thông tin
                let ths = document.querySelectorAll("#tbEmployeeList thead th");
                // Duyệt từng th để đọc các thông tin
                for (const th of ths) {
                    // Lấy thông tin của đối tượng bằng thuộc tính model-name
                    const modelName = th.getAttribute("model-name");
                    // Giá trị tương ứng của đối tượng
                    let valueTd = "";
                    if(modelName != null) {
                        valueTd = item[modelName];
                    }
                    // Build td element
                    let tdElement = document.createElement("td");
                    const type = th.getAttribute("type");
                    switch (type) {
                        case "checkbox":
                            // Thêm class cho cột checkbox
                            tdElement.classList.add("employee-border-left");
                            // Tạo thẻ input bên trong cột checkbox
                            valueTd = document.createElement("input");
                            valueTd.classList.add("checkbox-select-row");
                            valueTd.setAttribute("type","checkbox");
                            break;
                        case "date":
                            // Thêm class cho cột ngày sinh và format ngày tháng thành dd/MM/yyyy
                            tdElement.classList.add("text-center");
                            tdElement.classList.add("e-birthday");
                            valueTd = this.formatDate(valueTd);
                            break;
                        case "feat":
                            // Thêm các class và id cho cột chức năng
                            tdElement.classList.add("text-center");
                            tdElement.classList.add("employee-border-right");
                            tdElement.classList.add("e-birthday");
                            tdElement.id = "function-table";
                            // Tạo thẻ span
                            let spanUpdate = document.createElement("span");
                            spanUpdate.textContent = "Sửa";
                            valueTd += spanUpdate.outerHTML;
                            // Tạo menu item lựa chọn các chức năng khi bấm vào nút sửa
                            // Tạo các thẻ li
                            let liDuplicate = document.createElement("li");
                            liDuplicate.textContent = "Nhân bản";
                            let liDelete = document.createElement("li");
                            liDelete.classList.add("menu-function-select-delete-employee")
                            liDelete.textContent = "Xóa";
                            let liStopUse = document.createElement("li");
                            liStopUse.textContent = "Ngưng sử dụng";
                            // Tạo thẻ ul
                            let ulFeature = document.createElement("ul");
                            ulFeature.classList.add("menu-function-select");
                            ulFeature.append(liDuplicate, liDelete, liStopUse);
                            ulFeature.style.display = "none";
                            // Tạo các thẻ div
                            let divFunctionIconSelect = document.createElement("div");
                            divFunctionIconSelect.classList.add("function-icon-table");
                            divFunctionIconSelect.classList.add("function-icon-select");
                            divFunctionIconSelect.append(ulFeature);
                            let divFunctionTableContent = document.createElement("div");
                            divFunctionTableContent.classList.add("function-table-content");
                            divFunctionTableContent.append(divFunctionIconSelect);
                            valueTd += divFunctionTableContent.outerHTML;
                            break;
                        default:
                            break;
                    }
                    // append value vào td
                    // tdElement.append(valueTd);
                    if(typeof valueTd === "string"){
                        tdElement.innerHTML = valueTd;
                    }
                    else{
                        tdElement.append(valueTd);
                    }
                    // append td vào tr
                    trElement.append(tdElement);
                }
                // append tr vào tbody của table
                document.querySelector("#tbEmployeeList tbody").append(trElement);
            }
        } catch (error) {
           
        }
    }

    /**
     * Hàm định dạng ngày tháng năm theo format dd/MM/yyyy
     * Author: BNTIEN (23/05/2023)
     */
    formatDate(dataValue){
        try {
            let date = new Date(dataValue);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (error) {
            return "";
        }
    }

    /**
     * Hàm hiển thị form thêm mới nhân viên
     * Author: BNTIEN (23/05/2023)
     */
    openBtnAddNewEmployee(){
        try {
            document.getElementById("detail-info-employee").style.display = "block";
            document.getElementById("container-overlay").style.display = "block";
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí đóng form thêm mới nhân viên
     * Author: BNTIEN (23/05/2023)
     */
    closeFormEmployee(){
        try {
            document.getElementById("dialog-question-employee").style.display = "block";
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí sự kiện khi chọn button không trong dialog question employee
     * Author: BNTIEN (23/05/2023)
     */
    closeFormEmployeeNo(){
        try{
            document.getElementById("detail-info-employee").style.display = "none";
            document.getElementById("container-overlay").style.display = "none";
            document.getElementById("dialog-question-employee").style.display = "none";
        } catch(error) {
            
        }
    }

    /**
     * Hàm xử lí đóng mở các lựa chọn ở cột cuối cùng trong table employee
     * Author: BNTIEN (23/05/2023)
     */
    featureListEmployee(){
        try {
            // Lấy danh sách của các element có class = "function-table-content"
            var features = document.getElementsByClassName("function-table-content");
            // Lặp qua từng item và thêm sự kiện click
            for(let i = 0; i < features.length; i++) {
                features[i].addEventListener("click", function() {
                    // Tìm thẻ được click
                    let menu = this.getElementsByClassName("menu-function-select")[0];
                    // Đảo ngược trạng thái hiển thị, nếu đang là block thì thành none và ngược lại
                    if(menu.style.display === "none") {
                        menu.style.display  = "block";
                    } else{
                        menu.style.display = "none";
                    }
                });
            }
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí đóng mở lựa chọn số bản ghi trên trang
     * Author: BNTIEN (23/05/2023)
     */
    selectPagingEmployee(){
        try {
            let page = document.getElementById("menu-paging");
            if(page.style.display === "none"){
                page.style.display = "block";
            }
            else{
                page.style.display = "none";
            }
        } catch (error) {
            
        }
    }

    /**
     * Hàm set số bản ghi trên trang
     * Author: BNTIEN (23/05/2023)
     */
    setContentPagingEmployee(){
        try {
            // Lấy danh sách các element có class = "menu-paging-record"
            let records = document.getElementsByClassName("menu-paging-record");
            // Duyệt qua danh sách, gán sự kiện onclick cho từng item
            for (let i = 0; i < records.length; i++) {
                records[i].onclick = function(){
                    let contentRecord = records[i].textContent;
                    document.getElementById("pagination-detail-pagesize-content").textContent = contentRecord;
                };
            }
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí sự kiện khi bấm vào button cất và thêm trong form thêm mới nhân viên
     * Author: BNTIEN (23/05/2023)
     */
    closeBtnAddAndSaveEmployee(){
        try {
            // Lần lượt gán các biến tham chiếu đến các element có id tương ứng
            let employeeCode = document.getElementById("employee-code");
            let employeeName = document.getElementById("employee-name");
            let employeeUnit = document.getElementById("employee-unit");
            // Kiểm tra nếu input nào chưa có value thì thông báo cho người dùng
            if(employeeCode.value.trim() === ""){
                // Set border cho input đang bị bỏ trống
                employeeCode.style.border = "1px solid red";
                // Hiển thị dialog thông báo cho người dùng
                document.getElementById("dialog-content-main-notnull").textContent = "Mã không được để trống.";
                document.getElementById("dialog-danger-employee").style.display = "block";
                return;
            } else {
                // Set lại border cho input khi đã có dữ liệu
                employeeCode.style.border = "1px solid var(--color-border-default)";
            }
            if(employeeName.value.trim() === ""){
                // Set border cho input đang bị bỏ trống
                employeeName.style.border = "1px solid red";
                // Hiển thị dialog thông báo cho người dùng
                document.getElementById("dialog-content-main-notnull").textContent = "Tên không được để trống.";
                document.getElementById("dialog-danger-employee").style.display = "block";
                return;
            } else {
                // Set lại border cho input khi đã có dữ liệu
                employeeName.style.border = "1px solid var(--color-border-default)";
            }
            if(employeeUnit.value.trim() === ""){
                // Set border cho input đang bị bỏ trống
                document.getElementById("e-cbb").style.border = "1px solid red";
                // Hiển thị dialog thông báo cho người dùng
                document.getElementById("dialog-content-main-notnull").textContent = "Đơn vị không được để trống.";
                document.getElementById("dialog-danger-employee").style.display = "block";
                return;
            } else {
                // Set lại border cho input khi đã có dữ liệu
                document.getElementById("e-cbb").style.border = "1px solid var(--color-border-default)";
            }
            // Nếu các trường đã có đủ value thì cho phép cất
            if(employeeCode.value && employeeName.value && employeeUnit.value) {
                document.getElementById("detail-info-employee").style.display = "none";
                document.getElementById("container-overlay").style.display = "none";
            }
        } catch (error) {
            
        }
    }
    
    /**
     * Hàm xử lí sự kiện close dialog nhắc người dùng k được để trống dữ liệu
     * Author: BNTIEN (23/05/2023)
     */
    closeDialogDangerEmployee(){
        try {
            document.getElementById("dialog-danger-employee").style.display = "none";
            // Kiểm tra xem ô input nào đang bị bỏ trống và focus vào ô input đó.
            let contentTextDialog = document.getElementById("dialog-content-main-notnull").textContent;
            if(contentTextDialog.trim() === "Mã không được để trống."){
                document.getElementById("employee-code").focus();
            }
            if(contentTextDialog.trim() === "Tên không được để trống."){
                document.getElementById("employee-name").focus();
            }
            if(contentTextDialog.trim() === "Đơn vị không được để trống."){
                document.getElementById("employee-unit").focus();
            }
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí sự kiện khi click vào item xóa nhân viên
     * Author: BNTIEN (23/05/2023)
     */
    deleteEmployee(){
        try {
            // Lấy danh sách các element có class = "menu-function-select-delete-employee"
            let listDeleteEmployee = document.getElementsByClassName("menu-function-select-delete-employee");
            // Duyệt qua danh sách, gán sự kiện onclick cho từng item
            for (let i = 0; i < listDeleteEmployee.length; i++) {
                listDeleteEmployee[i].onclick = function(){
                    document.getElementById("dialog-warning-delete-employee").style.display = "block";
                };
            }
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí sự kiện khi click vào button có trong dialog xác nhận xóa nhân viên
     * Chưa xử lí dữ liệu vì link api đang bị sập
     * Author: BNTIEN (23/05/2023)
     */
    closeDialogWarningDeleleEmployeeYes(){
        try {
            document.getElementById("dialog-warning-delete-employee").style.display = "none";
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa nhân viên
     * Author: BNTIEN (23/05/2023)
     */
    closeDialogWarningDeleleEmployeeNo(){
        try {
            document.getElementById("dialog-warning-delete-employee").style.display = "none";
        } catch (error) {
            
        }
    }

    /**
     * Hàm xử lí sự kiện load lại toàn bộ dữ liệu khi click vào icon refresh
     * Author: BNTIEN (24/05/2023)
     */
    refreshData() {
        try {
            location.reload();
        } catch (error) {
            
        }
    }
}