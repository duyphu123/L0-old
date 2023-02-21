import React, { Component } from "react";
// import { DataGrid } from "@material-ui/x-data-grid";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import TextField from "@material-ui/core/TextField";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  // Autocomplete,
  Button,
  ButtonGroup,
  // TextField,
  InputAdornment,
  Input,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import {
  findUserByUserName,
  searchByPage,
  getItemById,
  getListHealthOrgByUser,
  SearchUserByUserName,
  searchByDto,
} from "./EmployeeService";
import UserEditorDialog from "./EmployeeEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import shortid from "shortid";
import { saveAs } from "file-saver";
import axios from "axios";
import { Delete, Satellite } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";


class Employee extends Component {
  // state = {
  //   keyword: "",
  //   rowsPerPage: 10,
  //   page: 0,
  //   eQAHealthOrgType: [],
  //   item: {},
  //   shouldOpenEditorDialog: false,
  //   shouldOpenConfirmationDialog: false,
  //   selectAllItem: false,
  //   selectedList: [],
  //   totalElements: 0,
  //   shouldOpenConfirmationDeleteAllDialog: false,

  // };
  // numSelected = 0;
  // rowCount = 0;

  constructor(props) {
    super(props);
    // const rows = [
    //   { id: 1, col1: "Hello", col2: "World" },
    //   { id: 2, col1: "X", col2: "World2" },
    //   { id: 3, col1: "Y", col2: "World3" },
    // ];
    const columns = [
      { title: "Họ Và Tên", field: "name", headerName: "name", width: 150 },
      {
        title: "Số Điện Thoại",
        field: "phone",
        headerName: "Country",
        width: 150,
      },
      { title: "Tuổi", field: "age", headerName: "age", width: 1500 },
      { title: "Email", field: "email", headerName: "email", width: 150 },
      { title: "code", field: "code", headerName: "id", width: 150 },
      { title: "ID", field: "id", headerName: "id", width: 150 },
      {
        title: "Actions",
        field: "actions",
        headerName: "actions",
        width: 150,
        render: (params) => (
          <div style={{cursor:"pointer"}}>
            <EditIcon style={{marginRight:10}} onClick={() =>this.editRow(params.id)}/>
            <DeleteIcon style={{marginRight:0}} onClick={()=>this.deleteRow(params.id)} />
          </div>
    ),
      },
    ];
    this.state = { rows: [], columns: columns, editID:null};
  }
  deleteRow = (id) =>{
    // deleteItem(id)

    console.log('deleteRow',id);
    let rows = this.state.rows;
    rows=rows.filter((data)=>data.id!==id)
    this.setState({rows:rows})
    console.log(rows);
    alert('Call Selected Here:');
  }
  // updatePageData = () => {
  //   var searchObject = {};
  //   //searchObject.text = this.state.keyword;
  //   searchObject.text = this.state.keyword.trim();
  //   searchObject.pageIndex = this.state.page + 1;
  //   searchObject.pageSize = this.state.rowsPerPage;

  //   searchByPage(searchObject.pageIndex, searchObject.pageSize).then(
  //     ({ data }) => {
  //       this.setState({
  //         itemList: [],
  //         totalElements: data.totalElements,
  //       });
  //     }
  //   );
  // };
  // static getDerivedStateFromProps(rows){
  //   console.log(rows);

  //   if (rows){
  //     rows.actions="testt"
  //     return {newRows:rows}
  //   }
  // }
  componentDidMount(props) {
    // this.updatePageData();

    this.getData();
    // console.log(props.rows)
  }
  // deleteRow = (event) => {
  //   console.log("delete", event);
  // };

  getData = () => {
    console.log("getData");
    fetch("http://training-api.oceantech.com.vn/cms/employees/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "", phone: "", age: "", email: "" }),
    })
      .then((res) => res.json())
      .then(
        (results) => {
          console.log("result", results.data);
          // let id1 = 1;
    
      
          const dataWithId = results.data.map((record) => {
            // Object.assign({id1:id1++})
            return {
              name: record.name,
              email: record.email,
              age: record.age,
              phone: record.phone,
              code:record.code,
              // actions: a,
              id: record.id,
            };
          });

          this.setState({ rows: dataWithId });
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

 
  render() {
    const { t, i18n } = this.props;
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog,
    } = this.state;

    return (
      <div className="m-sm-30">
        {/* <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: t("Dashboard.manage"), path: "/directory/apartment" },
              { name: t("user.title") },
            ]}
          />
        </div> */}

        <Grid container spacing={3}>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleEditItem({
                  startDate: new Date(),
                  endDate: new Date(),
                  isAddNew: true,
                });
              }}
            >
              {t("Add")}
            </Button>

            {/* {shouldOpenConfirmationDeleteAllDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDeleteAllDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t('DeleteAllConfirm')}
              />
            )} */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            {/* {shouldOpenEditorDialog && (
                <UserEditorDialog t={t} i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )} */}
            {/* 
              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t('DeleteConfirm')}
                />
              )} */}
          </div>

          <MaterialTable
            title={t("List")}
            // data={itemList}
            data={this.state.rows}
            columns={this.state.columns}
            // parentChildData={(row, rows) => {
            //   var list = rows.find((a) => a.id === row.parentId);
            //   return list;
            // }}
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
          ></MaterialTable>

          {/* <Autocomplete
            id="combo-box-demo"
            options={this.state.dataauto}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          /> */}
          <TablePagination
            align="left"
            className="px-16"
            rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
            component="div"
            labelRowsPerPage={t("general.rows_per_page")}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t("general.of")} ${
                count !== -1 ? count : `more than ${to}`
              }`
            }
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.setRowsPerPage}
          />
        </Grid>
      </div>
    );
  }
}

export default Employee;

// handleTextChange = (event) => {
//   this.setState({ keyword: event.target.value }, function () {});
// };

// handleKeyDownEnterSearch = (e) => {
//   if (e.key === "Enter") {
//     this.search();
//   }
// };

// setPage = (page) => {
//   this.setState({ page }, function () {
//     this.updatePageData();
//   });
// };

// setRowsPerPage = (event) => {
//   this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
//     this.updatePageData();
//   });
// };

// handleChangePage = (event, newPage) => {
//   this.setPage(newPage);
// };

// search() {
//   this.setState({ page: 0 }, () => {
//     var searchObject = {};
//     searchObject.text = this.state.keyword.trim();
//     searchObject.pageIndex = this.state.page + 1;
//     searchObject.pageSize = this.state.rowsPerPage;
//     searchByPage(searchObject.pageIndex, searchObject.pageSize).then(
//       ({ data }) => {
//         this.setState({
//           itemList: [...data.content],
//           totalElements: data.totalElements,
//         });
//       }
//     );
//   });
// }

// handleDownload = () => {
//   var blob = new Blob(["Hello, world!"], {
//     type: "text/plain;charset=utf-8",
//   });
//   saveAs(blob, "hello world.txt");
// };
// handleDialogClose = () => {
//   this.setState({
//     shouldOpenEditorDialog: false,
//     shouldOpenConfirmationDialog: false,
//     shouldOpenConfirmationDeleteAllDialog: false,
//   });
//   this.setPage(0);
// };

// handleOKEditClose = () => {
//   this.setState({
//     shouldOpenEditorDialog: false,
//     shouldOpenConfirmationDialog: false,
//   });
//   this.updatePageData();
// };

// handleDeleteUser = (id) => {
//   this.setState({
//     id,
//     shouldOpenConfirmationDialog: true,
//   });
// };

// handleEditUser = (item) => {
//   getItemById(item.id).then((result) => {
//     this.setState({
//       item: result.data,
//       shouldOpenEditorDialog: true,
//     });
//   });
// };

// handleEditItem = (item) => {
//   this.setState({
//     item: item,
//     shouldOpenEditorDialog: true,
//   });
// };

// handleDelete = (id) => {
//   this.setState({
//     id,
//     shouldOpenConfirmationDialog: true,
//   });
// };

// handleDeleteAll = (event) => {
//   this.handleDeleteList(this.data).then(() => {
//     this.updatePageData();
//     this.handleDialogClose();
//   });
// };
