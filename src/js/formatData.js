/**
 * Mô tả: Xử lí dữ liệu ngày tháng năm thành định dạng dd/MM/yyyy
 * created by : BNTIEN
 * created date: 29-05-2023 11:13:01
 */
const formatDate = (value) => {
    try {
      value=value.substring(0,10);
      const dates = value.split("-");
      const res = dates[2] + "/" + dates[1] + "/" + dates[0];
      return res;
    } catch (error) {
      return "";
    }
}

export {formatDate}
