import axios from "axios";

const BASE_URL = "https://cukcuk.manhnv.net/api/v1";

const apiEmployeemanage = {
    /**
     * Mô tả: Gọi api trả về danh sách một bảng nào đó trong database
     * created by : BNTIEN
     * created date: 29-05-2023 11:13:50
     */
    async getListAllObject(url){
        const response = await axios.get(`${BASE_URL}${url}`);
        return response;
    },

    /**
     * Mô tả: Gọi api trả về đối tượng bất kì theo id
     * created by : BNTIEN
     * created date: 29-05-2023 11:14:15
     */
    async getObjectById(url, id){
        const response = await axios.get(`${BASE_URL}${url}${id}`);
        return response;
    }
}

export default apiEmployeemanage;