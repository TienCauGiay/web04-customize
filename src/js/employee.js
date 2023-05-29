import axios from "axios";

/**
 * Mô tả: Gọi api trả về danh sách employee
 * created by : BNTIEN
 * created date: 29-05-2023 11:13:50
 */
const getAllEmployee = async () =>{
    try {
        const res = await axios.get(`https://cukcuk.manhnv.net/api/v1/Employees`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Mô tả: Gọi api trả về nhân viên theo id
 * created by : BNTIEN
 * created date: 29-05-2023 11:14:15
 */
const getEmployeeById = async (id) => {
    try {
        const res = await axios.delete(`https://cukcuk.manhnv.net/api/v1/Employees/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export {getAllEmployee, getEmployeeById}