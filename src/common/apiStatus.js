/**
 * Mô tả: khai báo các trạng thái trả về khi gọi 1 api
 * created by : BNTIEN
 * created date: 29-05-2023 10:56:04
 */

const STATUS = {
    // API đã xử lý yêu cầu thành công và trả về kết quả
    OK: 200,

    // Một tài nguyên mới đã được tạo thành công
    CREATED: 201,

    // Yêu cầu không hợp lệ
    BAD_REQUEST: 400,

    // Không có quyền truy cập vào tài nguyên hoặc không có thông tin chứng thực
    UNAUTHORIZED: 401,

    // Tài nguyên yêu cầu không được tìm thấy trên máy chủ
    NOT_FOUND: 404,

    // Xảy ra lỗi nội bộ trên máy chủ khi xử lí yêu cầu và không thể hoàn thành nó
    INTERNAL_SERVER_ERROR: 500
};

const CHECK_STATUS = {
    // Kiểm tra trạng thái có phải 200 không
    isResponseStatusOk: (status) => {
        return status === STATUS.OK;
    },

    // Kiểm tra trạng thái có phải 201 không
    isResponseStatusCreated: (status) => {
        return status === STATUS.CREATED;
    },

    // Kiểm tra trạng thái có phải 400 không
    isResponseStatusBadRequest: (status) => {
        return status === STATUS.BAD_REQUEST;
    },

    // Kiểm tra trạng thái có phải 401 không
    isResponseStatusUnauthorized: (status) => {
        return status === STATUS.UNAUTHORIZED;
    },

    // Kiểm tra trạng thái có phải 404 không
    isResponseStatusNotFound: (status) => {
        return status === STATUS.NOT_FOUND;
    },

    // Kiểm tra trạng thái có phải 500 không
    isResponseStatusServerError: (status) => {
        return status === STATUS.INTERNAL_SERVER_ERROR;
    }
};
  
export { STATUS, CHECK_STATUS };
  
