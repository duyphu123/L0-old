// import React from "react";
// import { Grid, IconButton, Icon, Button, TextField } from "@material-ui/core";
// import SearchIcon from '@material-ui/icons/Search';
// import MaterialTable, { MTableToolbar } from "material-table";
// // import { deleteUser } from "./EmployeesService";
// // import EmployeesEditorDialog from "./EmployeesEditorDialog";
// import { Breadcrumb, ConfirmationDialog } from "egret";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import i18n from "i18n"
// import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { getEmployees } from "app/redux/actions/EmployeesActions";

// toast.configure({
// 	autoClose: 1000,
// 	draggable: false,
// 	limit: 3
// });

// function MaterialButton(props) {
// 	const { onHandleDeleteClick, onHandleEditClick } = props
// 	return (
// 		<div>
// 			<IconButton
// 				style={{ marginRight: 10 }}
// 				size="small"
// 				onClick={onHandleEditClick}
// 			>
// 				<Icon fontSize="small" color="primary">
// 					edit
// 				</Icon>
// 			</IconButton>
// 			<IconButton
// 				size="small"
// 				onClick={onHandleDeleteClick}
// 			>
// 				<Icon fontSize="small" color="secondary">
// 					delete
// 				</Icon>
// 			</IconButton>
// 		</div>
// 	);
// }

// function Columns(t, handleDeleteClick, handleEditClick) {
// 	return [
// 		{
// 			title: t("Action"),
// 			field: "custom",
// 			align: "left",
// 			width: "100",
// 			render: (rowData) => (
// 				<MaterialButton
// 					item={rowData}
// 					onHandleEditClick={() => handleEditClick(rowData)}
// 					onHandleDeleteClick={() => handleDeleteClick(rowData)}
// 				/>
// 			)
// 		},
// 		{ title: t("user.displayName"), field: "name", width: "150" },
// 		{
// 			title: "Phone",
// 			field: "phone",
// 			align: "left",
// 			with: "100"
// 		},
// 		{
// 			title: t("general.email"),
// 			field: "email",
// 			align: "left",
// 			width: "150"
// 		},
// 		{ title: t("user.age"), field: "age", width: "100" },
// 		{
// 			title: "Code",
// 			field: "code",
// 			align: "left",
// 			with: "100"
// 		}
// 	];
// }

// function Employees() {

// 	const [item, setItem] = useState({})
// 	const [textSearch, setTextSearch] = useState("")
// 	const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
// 	const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false)

// 	const { t } = useTranslation("translation");

// 	// const disPatch = useDispatch()
// 	// const itemList = useSelector(state => state.Employees.Employees)

// 	// const handleDialogEditorClose = () => {
// 	// 	setShouldOpenEditorDialog(false)
// 	// 	disPatch(getEmployees({ name: textSearch }))
// 	// 	setItem({})
// 	// }

// 	const handleDeleteClick = (item) => {
// 		setItem(item)
// 		setShouldOpenConfirmationDialog(true)
// 	}

// 	const handleConfirmDialogClose = () => {
// 		setItem({})
// 		setShouldOpenConfirmationDialog(false)
// 	}

// 	// const handleYesClick = async (id) => {
// 	// 	const data = await deleteUser(id)
// 	// 	if (data.data.message === "Thành công!") {
// 	// 		toast.success("Xóa nhân viên thành công")
// 	// 		handleConfirmDialogClose()
// 	// 		setItem({})
// 	// 		disPatch(getEmployees({ name: textSearch }))
// 	// 	} else {
// 	// 		toast.error("Có lỗi")
// 	// 		handleConfirmDialogClose()
// 	// 	}
// 	// }

// 	const handleEditClick = (item) => {
// 		setItem(item)
// 		setShouldOpenEditorDialog(true)
// 	}

// 	const columns = Columns(t, handleDeleteClick, handleEditClick)

// 	// useEffect(() => {
// 	// 	disPatch(getEmployees({ name: textSearch }))
// 	// }, [textSearch])

// 	return (
// 		<div className="m-sm-30">

// 			<div className="mb-sm-30">
// 				<Breadcrumb
// 					routeSegments={[
// 						{ name: t("Dashboard.manage"), path: "/directory/apartment" },
// 						{ name: t("Nhân viên") }
// 					]}
// 				/>
// 			</div>

// 			<Grid container justify="space-between">
// 				<Grid item style={{ paddingTop: 10 }}>
// 					<Button
// 						className="mb-16 mr-16 align-bottom"
// 						variant="contained"
// 						color="primary"
// 						onClick={() => setShouldOpenEditorDialog(true)}
// 					>
// 						{t("Add")}
// 					</Button>
// 				</Grid>

// 				<Grid item >
// 					<TextField
// 						id="standard-basic"
// 						label={t("EnterSearchEmployees")}
// 						value={textSearch}
// 						onChange={(e) => setTextSearch(e.target.value)}
// 					/>
// 				</Grid>
// 			</Grid>

// 			<Grid item xs={12}>
// 				{/* <div>
// 					{shouldOpenEditorDialog && (
// 						<EmployeesEditorDialog
// 							i18n={i18n}
// 							open={shouldOpenEditorDialog}
// 							t={t}
// 							handleClose={handleDialogEditorClose}
// 							item={item}
// 						/>
// 					)}

// 					{shouldOpenConfirmationDialog && (
// 						<ConfirmationDialog
// 							open={shouldOpenConfirmationDialog}
// 							title={t("confirm")}
// 							item={item}
// 							onConfirmDialogClose={handleConfirmDialogClose}
// 							onYesClick={handleYesClick}
// 							text={t("DeleteConfirm")}
// 						/>
// 					)}
// 				</div> */}
// 				<MaterialTable
// 					title={t("List")}
// 					// data={itemList}
// 					columns={columns}
// 					components={{
// 						Toolbar: (props) => <MTableToolbar {...props} />
// 					}}
// 					onSelectionChange={(rows) => {
// 						this.data = rows;
// 					}}
// 					options={{
// 						selection: false,
// 						actionsColumnIndex: -1,
// 						paging: false,
// 						search: false,
// 						rowStyle: (rowData, index) => ({
// 							backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF"
// 						}),
// 						maxBodyHeight: "450px",
// 						minBodyHeight: "370px",
// 						headerStyle: {
// 							backgroundColor: "#358600",
// 							color: "#fff"
// 						},
// 						padding: "dense",
// 						toolbar: false
// 					}}
// 					localization={{
// 						body: {
// 							emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`
// 						}
// 					}}
// 				/>
// 			</Grid>
// 		</div>
// 	)
// }

// export default Employees;

import React from "react";
import { Grid, IconButton, Icon, Button, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable, { MTableToolbar } from "material-table";
import { deleteUser } from "./EmployeesService";
import EmployeesEditorDialog from "./EmployeesEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import i18n from "i18n";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "app/redux/actions/EmployeesActions";
import FormDialog from "./index";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

function MaterialButton(props) {
  const { onHandleDeleteClick, onHandleEditClick } = props;
  return (
    <div>
      <IconButton
        style={{ marginRight: 10 }}
        size="small"
        onClick={onHandleEditClick}
      >
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={onHandleDeleteClick}>
        <Icon fontSize="small" color="secondary">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

function Columns(t, handleDeleteClick, handleEditClick) {
  return [
    {
      title: t("Action"),
      field: "custom",
      align: "left",
      width: "100",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onHandleEditClick={() => handleEditClick(rowData)}
          onHandleDeleteClick={() => handleDeleteClick(rowData)}
        />
      ),
    },
    { title: t("user.displayName"), field: "name", width: "150" },

    {
      title: "Phone",
      field: "phone",
      align: "left",
      with: "100",
    },
    {
      title: t("general.email"),
      field: "email",
      align: "left",
      width: "150",
    },
    { title: "Tuổi", field: "age", width: "100" },
    {
      title: "Code",
      field: "code",
      align: "left",
      with: "100",
    },
  ];
}

function Employees() {
  const [postList, setPostList] = useState();
  const [open2, setOpen2] = useState(false);
  console.log(postList);
  const [item, setItem] = useState({});

  const [textSearch, setTextSearch] = useState("");
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);

  const { t } = useTranslation("translation");

  const disPatch = useDispatch();
  //   const itemList = useSelector((state) => state.Employees.Employees);

  const handleDialogEditorClose = () => {
    setShouldOpenEditorDialog(false);
    disPatch(getEmployees({ name: textSearch }));
    setItem({});
  };

  const handleDeleteClick = (item) => {
    setItem(item);
    setShouldOpenConfirmationDialog(true);
  };

  const handleConfirmDialogClose = () => {
    setItem({});
    setShouldOpenConfirmationDialog(false);
  };

  const handleYesClick = async (id) => {
    const data = await deleteUser(id);
    if (data.data.message === "Thành công!") {
      toast.success("Xóa nhân viên thành công");
      handleConfirmDialogClose();
      setItem({});
      disPatch(getEmployees({ name: textSearch }));
    } else {
      toast.error("Có lỗi");
      handleConfirmDialogClose();
    }
  };

  const handleEditClick = (item) => {
    setItem(item);
    setOpen2(true);
  };

  const columns = Columns(t, handleDeleteClick, handleEditClick);

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(
        "http://training-api.oceantech.com.vn/cms/employees/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "", phone: "", age: "", email: "" }),
        }
      );
      const responseJSON = await response.json();
      console.log({ responseJSON });
      const { data } = responseJSON;

      console.log(data);
      const data2 = data.map((record) => {
        return {
          id: record.id,
          name: record.name,
          phone: record.phone,
          age: record.age,
          code: record.code,
          email: record.email,
        };
      });
      console.log(data2);
      setPostList(data2);
    }
    fetchAPI();
  }, []);
  // useEffect(() => {
  //   async function fetchAPIProvinces() {
  //     const response = await fetch(
  //       "http://training-api.oceantech.com.vn/cms/provinces/search",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ name: "" }),
  //       }
  //     );
  //     const responseJSON = await response.json();
  //     const { data } = responseJSON;
  //     console.log(data);
  //     const data2 = data.map((record) => {
  //       return {
  //         name: record.name,
  //       };
  //     });
  //     console.log(data2);
  //     setPostList(data2);
  //   }
  //   fetchAPIProvinces();
  // }, []);
  const handleClose = () => {
    setOpen2(false);
  };
  const creat = (data) =>{
    alert('call me')
  }
  return (
    <div className="m-sm-30">
      <button onClick={() => setOpen2(true)}>Add</button>
      <div>{open2 && <FormDialog handleClose={handleClose} />}</div>
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: t("Dashboard.manage"), path: "/directory/apartment" },
            { name: t("Nhân viên") },
          ]}
        />
      </div>

      <Grid container justify="space-between">
        <Grid item style={{ paddingTop: 10 }}>
          <Button
            className="mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => setOpen2(true)}
          >
            {t("Add")}
          </Button>
        </Grid>

        <Grid item>
          <TextField
            id="standard-basic"
            label={t("EnterSearchEmployees")}
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <div>
          {shouldOpenEditorDialog && (
            <EmployeesEditorDialog
              i18n={i18n}
              open={shouldOpenEditorDialog}
              t={t}
              handleClose={handleDialogEditorClose}
              creat={creat}
              item={item}
            />
          )}

          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              title={t("confirm")}
              item={item}
              onConfirmDialogClose={handleConfirmDialogClose}
              onYesClick={handleYesClick}
              text={t("DeleteConfirm")}
            />
          )}
        </div>

        <MaterialTable
          title={t("List")}
          data={postList}
          columns={columns}
          components={{
            Toolbar: (props) => <MTableToolbar {...props} />,
          }}
          onSelectionChange={(rows) => {
            this.data = rows;
          }}
          options={{
            selection: false,
            actionsColumnIndex: -1,
            paging: false,
            search: false,
            rowStyle: (rowData, index) => ({
              backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
            }),
            maxBodyHeight: "450px",
            minBodyHeight: "370px",
            headerStyle: {
              backgroundColor: "#358600",
              color: "#fff",
            },
            padding: "dense",
            toolbar: false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
            },
          }}
        />
      </Grid>
    </div>
  );
}

export default Employees;
