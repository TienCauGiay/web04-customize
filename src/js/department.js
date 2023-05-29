import axios from "axios";

/**
 * Mô tả: Gọi api trả về danh sách department
 * created by : BNTIEN
 * created date: 29-05-2023 11:11:58
 */
const getAllDepartment = async () => {
    try {
        const res = await axios.get(`https://cukcuk.manhnv.net/api/v1/Departments`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export {getAllDepartment}