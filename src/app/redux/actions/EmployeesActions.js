export const GET_Employees = "GET_Employees";
export const SET_Employees = "SET_Employees";

export const GET_LIST_PROVINCE = "GET_LIST_PROVINCE";
export const SET_LIST_PROVINCE = "SET_LIST_PROVINCE";

export const GET_LIST_DISTRICT = "GET_LIST_DISTRICT";
export const SET_LIST_DISTRICT = "SET_LIST_DISTRICT";

export const GET_LIST_COMMUNE = "GET_LIST_COMMUNE";
export const SET_LIST_COMMUNE = "SET_LIST_COMMUNE";

export const getEmployees = (payload) => {
  return {
    type: GET_Employees,
    payload,
  };
};

export const setEmployees = (payload) => {
  return {
    type: SET_Employees,
    payload,
  };
};

export const getListProvince = () => {
  return {
    type: GET_LIST_PROVINCE,
  };
};

export const setListProvince = (payload) => {
  return {
    type: SET_LIST_PROVINCE,
    payload,
  };
};

export const getListDistrict = () => {
  return {
    type: GET_LIST_DISTRICT,
  };
};

export const setListDistrict = (payload) => {
  return {
    type: SET_LIST_DISTRICT,
    payload,
  };
};

export const getListCommune = () => {
  return {
    type: GET_LIST_COMMUNE,
  };
};

export const setListCommune = (payload) => {
  return {
    type: SET_LIST_COMMUNE,
    payload,
  };
};
