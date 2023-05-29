/**
 * Mô tả: khai báo các trạng thái trả về khi gọi 1 api
 * created by : BNTIEN
 * created date: 29-05-2023 10:56:04
 */

const API_STATUS = {
    // api đã xử lý yêu cầu thành công và trả về kết quả
    OK: 200,

    // một tài nguyên mới đã được tạo thành công
    CREATED: 201,

    // yêu cầu không hợp kệ
    BAD_REQUEST: 400,

    // không có quyền truy cập vào tài nguyên hoặc không có thông tin chứng thực
    UNAUTHORIZED: 401,

    // tài nguyên yêu cầu không được tìm thấy trên máy chủ
    NOT_FOUND: 404,

    // xảy ra lỗi nội bộ trên máy chủ khi xử lí yêu cầu và không thể hoàn thành nó
    INTERNAL_SERVER_ERROR: 500
};

// Kiểm tra trạng thái có phải 200 không
const isResponseStatusOk = (status) => {
    return status === API_STATUS.OK;
};

// Kiểm tra trạng thái có phải 201 không
const isResponseStatusCreated = (status) => {
    return status === API_STATUS.CREATED;
};

// Kiểm tra trạng thái có phải 400 không
const isResponseStatusBadRequest = (status) => {
    return status === API_STATUS.BAD_REQUEST;
};

// Kiểm tra trạng thái có phải 401 không
const isResponseStatusUnauthorized = (status) => {
    return status === API_STATUS.UNAUTHORIZED;
};

// Kiểm tra trạng thái có phải 404 không
const isResponseStatusNotFound = (status) => {
    return status === API_STATUS.NOT_FOUND;
};

// Kiểm tra trạng thái có phải 500 không
const isResponseStatusNotServerError = (status) => {
    return status === API_STATUS.INTERNAL_SERVER_ERROR;
};

export {API_STATUS, 
    isResponseStatusOk,
    isResponseStatusCreated,
    isResponseStatusBadRequest,
    isResponseStatusUnauthorized,
    isResponseStatusNotFound,
    isResponseStatusNotServerError
}
  