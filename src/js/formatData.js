/**
 * Mô tả: Xử lí dữ liệu ngày tháng năm thành định dạng dd/MM/yyyy
 * created by : BNTIEN
 * created date: 29-05-2023 11:13:01
 */
const formatDate = (value) => {
    try {
      let date = new Date(value);
      let day = date.getDay().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return "";
    }
}

export {formatDate}
