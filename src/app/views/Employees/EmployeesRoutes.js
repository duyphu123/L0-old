// import { EgretLoadable } from "egret";
// import ConstantList from "../../appConfig";
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
// const Employees = EgretLoadable({
//   loader: () => import("./Employees")
// });
// const ViewComponent = withTranslation()(Employees);

// const EmployeesRoutes = [
//   {
//     path:  ConstantList.ROOT_PATH+"Employees_manager/Employees",
//     exact: true,
//     component: ViewComponent
//   }
// ];

// export default EmployeesRoutes;
import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Employees = EgretLoadable({
  loader: () => import("./Employees"),
});
const ViewComponent = withTranslation()(Employees);

const EmployeesRoutes = [
  {
    path: ConstantList.ROOT_PATH + "Employees_manager/Employees",
    exact: true,
    component: ViewComponent,
  },
];

export default EmployeesRoutes;
