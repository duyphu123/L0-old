import axios from "axios";
import ConstantList from "../../appConfig";
const API_ROOT = ConstantList.API_ENPOINT;

// insert Employees
export const insertEmployees = (obj) => {
  let url = API_ROOT + "/Employees";
  return axios.post(url, obj);
};
// search user
export const getUserList = (searchObj) => {
  let url = API_ROOT + "/Employees/search";
  return axios.post(url, searchObj);
};
// delete user
export const deleteUser = (id) => {
  let url = API_ROOT + `/Employees/${id}`;
  return axios.delete(url);
};
// update Employees
export const updateEmployees = (id, obj) => {
  let url = API_ROOT + `/Employees/${id}`;
  return axios.put(url, obj);
};
// get province
export const getProvince = () => {
  let url = API_ROOT + "/provinces/search";
  return axios.post(url, {});
};
// get districts
export const getDistrict = () => {
  let url = API_ROOT + "/districts/search";
  return axios.post(url, {});
};
// get commune
export const getCommune = () => {
  let url = API_ROOT + "/communes/search";
  return axios.post(url, {});
};
