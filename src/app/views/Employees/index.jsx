import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18n";
import {
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Icon,
} from "@material-ui/core";
import { insertEmployees, updateEmployees } from "./EmployeesService";
import { toast } from "react-toastify";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});
export default function FormDialog(props) {
  const { handleClose, item, creat } = props;
  const [open, setOpen] = React.useState(true);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(item?.name);
  const [age, setAge] = useState(item?.age);
  const [email, setEmail] = useState(item?.email);
  const [code, setCode] = useState(item?.code);
  const [phone, setPhone] = useState(item?.phone);

  const [address, setAddress] = useState({
    province: {},
    district: {},
    commune: {},
    districtsByProvince: [],
    communesByDistrict: [],
  });

  const handleValidateForm = () => {
    if (JSON.stringify(address.province) === JSON.stringify({})) {
      return false;
    }
    if (JSON.stringify(address.district) === JSON.stringify({})) {
      return false;
    }
    if (JSON.stringify(address.commune) === JSON.stringify({})) {
      return false;
    }
    return true;
  };
  const id = item?.id;

  const handleChange = (e) => {
    if (e.target.name === "province") {
      setAddress({
        ...address,
        province: e.target.value,
        district: {},
        commune: {},
        districtsByProvince: [],
        communesByDistrict: [],
      });
    }

    if (e.target.name === "district") {
      const list = listCommune.filter(
        (commune) => commune.district.name == e.target.value.name
      );
      setAddress({
        ...address,
        district: e.target.value,
        commune: {},
        communesByDistrict: list,
      });
    }

    if (e.target.name === "commune") {
      setAddress({
        ...address,
        commune: e.target.value,
      });
    }
  };
  const handleOpenDistrict = () => {
    const checkEmptyProvince =
      Object.keys(address.province).length === 0 &&
      address.province.constructor === Object;

    if (checkEmptyProvince) {
      return;
    } else {
      setAddress({
        ...address,
        districtsByProvince: listDistrict,
      });
    }
  };

  const { t } = useTranslation("translation");
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpenDistrict = () => {
  //   const checkEmptyProvince =
  //     Object.keys(address.province).length === 0 &&
  //     address.province.constructor === Object;

  //   if (checkEmptyProvince) {
  //     return;
  //   } else {
  //     setAddress({
  //       ...address,
  //       districtsByProvince: listDistrict,
  //     });
  //   }
  // };

  const handleOpenCommune = () => {
    const checkEmptyDistrict =
      Object.keys(address.district).length === 0 &&
      address.district.constructor === Object;
    if (checkEmptyDistrict) {
      return;
    }
  };

  const handleSave = async () => {
    setLoading(true);

    const Employees = {
      name,
      age,
      email,
      code,
      phone,
      province: address.province,
      district: address.district,
      commune: address.commune,
    };
    const checkAddress = handleValidateForm();

    if (checkAddress) {
      if (id) {
        const data = await updateEmployees(id, Employees);

        if (data.data.message === "Thành công!") {
          setLoading(false);
          toast.success("Cập nhật viên thành công");
          handleClose();
        } else {
          setLoading(false);
          toast.warning(data.data.message);
        }
      } else {
        const data = await insertEmployees(Employees);

        if (data.data.message === "Thành công!") {
          setLoading(false);
          toast.success("Thêm nhân viên thành công");
          handleClose();
          creat();
        } else {
          setLoading(false);
          toast.warning(data.data.message);
        }
      }
    } else {
      setLoading(false);
      toast.error("Nhập đủ địa chỉ");
    }
  };
  useEffect(() => {
    async function fetchAPIProvinces() {
      const response = await fetch(
        "http://training-api.oceantech.com.vn/cms/provinces/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "" }),
        }
      );
      const responseJSON = await response.json();
      const listProvince = responseJSON.data;
      console.log(listProvince);
      // const data2 = listProvince.map((record) => {
      //   return {
      //     id: record.id,
      //     name: record.name,
      //   };
      // });
      // console.log(data2);
      setListProvince(listProvince);
    }
    fetchAPIProvinces();
  }, []);

  useEffect(() => {
    async function fetchAPIDistrict() {
      const response = await fetch(
        "http://training-api.oceantech.com.vn/cms/districts/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "" }),
        }
      );
      const responseJSON = await response.json();
      const listDistrict = responseJSON.data;
      console.log(listDistrict);
      setListDistrict(listDistrict);
    }
    fetchAPIDistrict();
  }, []);

  useEffect(() => {
    async function fetchAPICommune() {
      const response = await fetch(
        "http://training-api.oceantech.com.vn/cms/communes/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "" }),
        }
      );
      const responseJSON = await response.json();
      const listCommune = responseJSON.data;
      console.log(listCommune);
      setListCommune(listCommune);
    }
    fetchAPICommune();
  }, []);
  useEffect(() => {
    ValidatorForm.addValidationRule("isName", (value) => {
      if (value.length < 6) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isAge", (value) => {
      if (value <= 18 || value >= 75) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isCode", (value) => {
      let regex = /^\w{6,}$/;
      if (!regex.test(value)) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isPhone", (value) => {
      let regex = /^0[1-9][0-9]{8}$/;
      if (!regex.test(value)) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isName");
      ValidatorForm.removeValidationRule("isAge");
      ValidatorForm.removeValidationRule("isCode");
      ValidatorForm.removeValidationRule("isPhone");
    };
  }, []);

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <span className="mb-20 styleColor">
            {" "}
            {(id ? t("general.update") : t("Add")) +
              " " +
              t("user.title_Employees")}{" "}
          </span>

          <IconButton
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() => handleClose()}
          >
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm
          // ref="form"
          onSubmit={handleSave}
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent dividers>
            <Grid className="mb-16" container spacing={1}>
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("user.displayName")}
                    </span>
                  }
                  type="text"
                  name="name"
                  value={name ? name : ""}
                  onChange={(e) => setName(e.target.value)}
                  validators={["required", "isName"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    "Họ và tên ít nhất 6 ký tự",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* age */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("user.age")}
                    </span>
                  }
                  type="number"
                  name="age"
                  value={age ? age : ""}
                  onChange={(e) => setAge(e.target.value)}
                  validators={["required", "isAge"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    "Không trong độ tuổi lao động",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* email */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("Email")}
                    </span>
                  }
                  type="email"
                  name="email"
                  value={email ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    t("general.errorMessages_email_valid"),
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* code */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("user.code")}
                    </span>
                  }
                  type="text"
                  name="code"
                  value={code ? code : ""}
                  onChange={(e) => setCode(e.target.value)}
                  validators={["required", "isCode"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    "Code phải đủ 6-10 ký tự",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* phone */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t("user.phone")}
                    </span>
                  }
                  type="tel"
                  name="phone"
                  value={phone ? phone : ""}
                  onChange={(e) => setPhone(e.target.value)}
                  validators={["required", "isPhone"]}
                  errorMessages={[
                    t("general.errorMessages_required"),
                    "Nhập đúng định dạng sđt",
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* province */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <FormControl
                  className="mb-16"
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel htmlFor="province-simple">
                    {<span className="font">{t("user.province")}</span>}
                  </InputLabel>
                  <Select
                    value={
                      JSON.stringify(address.province) === JSON.stringify({})
                        ? null
                        : address.province
                    }
                    onChange={(e) => handleChange(e)}
                    inputProps={{
                      name: "province",
                      id: "province-simple",
                    }}
                  >
                    {listProvince.map((province) => {
                      return (
                        <MenuItem key={province.id} value={province}>
                          {province.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {/* district */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <FormControl
                  className="mb-16"
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel htmlFor="district-simple">
                    {<span className="font">{t("user.district")}</span>}
                  </InputLabel>
                  <Select
                    value={
                      JSON.stringify(address.district) === JSON.stringify({})
                        ? null
                        : address.district
                    }
                    onChange={(e) => handleChange(e)}
                    onOpen={handleOpenDistrict}
                    inputProps={{
                      name: "district",
                      id: "district-simple",
                    }}
                  >
                    {address.districtsByProvince.map((district) => {
                      return (
                        <MenuItem key={district.id} value={district}>
                          {district.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {/* commune */}
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel htmlFor="commune-simple">
                    {<span className="font">{t("user.commune")}</span>}
                  </InputLabel>
                  <Select
                    value={
                      JSON.stringify(address.commune) === JSON.stringify({})
                        ? null
                        : address.commune
                    }
                    onChange={(e) => handleChange(e)}
                    onOpen={handleOpenCommune}
                    inputProps={{
                      name: "commune",
                      id: "commune-simple",
                    }}
                  >
                    {address.communesByDistrict.map((commune) => {
                      return (
                        <MenuItem key={commune.id} value={commune}>
                          {commune.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClose()}
            >
              {t("Cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {t("Save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Họ Và Tên"
              type="email"
              fullWidth
              value={name ? name : ""}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={4} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tuổi"
              type="email"
              fullWidth
              value={age ? age : ""}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={4} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              value={email ? email : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Code"
              type="email"
              fullWidth
              value={code ? code : ""}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone"
              type="email"
              fullWidth
              value={phone ? phone : ""}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <FormControl
              className="mb-16"
              fullWidth={true}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="province-simple">
                {<span className="font">{t("user.province")}</span>}
              </InputLabel>
              <Select
                value={
                  JSON.stringify(address.province) === JSON.stringify({})
                    ? null
                    : address.province
                }
                onChange={(e) => handleChange(e)}
                inputProps={{
                  name: "province",
                  id: "province-simple",
                }}
              >
                {listProvince.map((province) => {
                  // console.log(province);
                  return (
                    <MenuItem key={province.id} value={province}>
                      {province.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={4} md={4} sm={4} xs={12}>
            <FormControl
              className="mb-16"
              fullWidth={true}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="district-simple">
                {<span className="font">{t("user.district")}</span>}
              </InputLabel>
              <Select
                value={
                  JSON.stringify(address.district) === JSON.stringify({})
                    ? null
                    : address.district
                }
                onChange={(e) => handleChange(e)}
                onOpen={handleOpenDistrict}
                inputProps={{
                  name: "district",
                  id: "district-simple",
                }}
              >
                {address.districtsByProvince.map((district) => {
                  console.log(district);
                  return (
                    <MenuItem key={district.id} value={district}>
                      {district.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <FormControl fullWidth={true} variant="outlined" size="small">
              <InputLabel htmlFor="commune-simple">
                {<span className="font">{t("user.commune")}</span>}
              </InputLabel>
              <Select
                value={
                  JSON.stringify(address.commune) === JSON.stringify({})
                    ? null
                    : address.commune
                }
                onChange={(e) => handleChange(e)}
                onOpen={handleOpenCommune}
                inputProps={{
                  name: "commune",
                  id: "commune-simple",
                }}
              >
                {address.communesByDistrict.map((commune) => {
                  return (
                    <MenuItem key={commune.id} value={commune}>
                      {commune.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
