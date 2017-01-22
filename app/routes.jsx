import React from 'react';
import {Route, IndexRoute} from 'react-router';
import './lib';

import Layout from './Layout';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Users from './pages/Users';
import User from './pages/User';
import NewUser from './pages/NewUser';
import Company from './pages/Company';
import EditCompany from './pages/EditCompany';
import Role from './pages/Role';
import Permission from './pages/Permission';
import Partner from './pages/Partner';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import Quotation from './pages/Quotation';
import SalesOrder from './pages/SalesOrder';
import Inquiry from './pages/Inquiry';
import PurchaseOrder from './pages/PurchaseOrder';
import Supplier from './pages/Supplier';
import NewSupplier from './pages/NewSupplier';
import Stock from './pages/Stock';
import Bill from './pages/Bill';
import Employee from './pages/Employee';
import NewEmployee from './pages/NewEmployee';
import EmployeeDetail from './pages/EmployeeDetail';
import Department from './pages/Department';
import NewDepartment from './pages/NewDepartment';
import DepartmentDetail from './pages/DepartmentDetail';
import Job from './pages/Job';

export default [
  <Route path="/" component={Home} />,
  <Route path="/product" component={Layout}>
    <Route path="list" component={Product} />
  </Route>,
  <Route path="/sales" component={Layout}>
    <Route path="partner" component={Partner} />
    <Route path="quotation" component={Quotation} />
    <Route path="order" component={SalesOrder} />
    <Route path="product" component={Product} />
    <Route path="product/new" component={NewProduct} />
  </Route>,
  <Route path="/config" component={Layout}>
    <Route path="user" component={Users} />
    <Route path="user/new" component={NewUser} />
    <Route path="user/:id" component={User} />
    <Route path="company" component={Company} />
    <Route path="company/edit" component={EditCompany} />
    <Route path="role" component={Role} />
    <Route path="permission" component={Permission} />
  </Route>,
  <Route path="/purchase" component={Layout}>
    <Route path="inquiry" component={Inquiry} />
    <Route path="order" component={PurchaseOrder} />
    <Route path="supplier" component={Supplier} />
    <Route path="supplier/new" component={NewSupplier} />
    <Route path="product" component={Product} />
    <Route path="stock" component={Stock} />
    <Route path="bill" component={Bill} />
  </Route>,
  <Route path="/hr" component={Layout}>
    <Route path="employee" component={Employee} />
    <Route path="employee/new" component={NewEmployee} />
    <Route path="employee/:id" component={EmployeeDetail} />
    <Route path="department" component={Department} />
    <Route path="department/new" component={NewDepartment} />
    <Route path="department/:id" component={DepartmentDetail} />
    <Route path="job" component={Job} />
  </Route>
];
