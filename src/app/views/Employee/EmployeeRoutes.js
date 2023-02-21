import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const User = EgretLoadable({
  loader: () => import("./Employee")
});
const ViewComponent = withTranslation()(User);

const EmployeeRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"employee_manager/employee",
    exact: true,
    component: ViewComponent
  }
];

export default EmployeeRoutes;
