import axios from "axios";

// const BASE_URL = "https://cukcuk.manhnv.net/api/v1";

const BASE_URL = "https://localhost:44378/api";


const apiEmployeemanage = {
    /**
     * Mô tả: Gọi api trả về danh sách một bảng nào đó trong database
     * created by : BNTIEN
     * created date: 29-05-2023 11:13:50
     */
    async getListAllObject(url){
        try {
            const response = await axios.get(`${BASE_URL}${url}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Mô tả: Gọi api trả về đối tượng bất kì theo id
     * created by : BNTIEN
     * created date: 29-05-2023 11:14:15
     */
    async getObjectById(url, id){
        try {
            const response = await axios.get(`${BASE_URL}${url}${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Mô tả: Gọi api xóa đối tượng theo id
     * created by : BNTIEN
     * created date: 30-05-2023 14:23:45
     */
    async deleteObjectById(url, id) {
        try {
            const response = await axios.delete(`${BASE_URL}${url}${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Mô tả: Gọi api thêm mới 1 nhân viên
     * created by : BNTIEN
     * created date: 30-05-2023 16:21:50
     */
    async postObject(url, obj){
        try {
            const response = await axios.post(`${BASE_URL}${url}`, obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Mô tả: Gọi api cập nhật thông tin 1 nhân viên
     * created by : BNTIEN
     * created date: 30-05-2023 22:56:36
     */
    async putObject(url, obj) {
        try {
            const response = await axios.put(`${BASE_URL}${url}`, obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export default apiEmployeemanage;