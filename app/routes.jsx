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
import ProductDetail from './pages/ProductDetail';
import Quotation from './pages/Quotation';
import NewSaleOrder from './pages/NewSaleOrder';
import Customer from './pages/Customer';
import NewCustomer from './pages/NewCustomer';
import CustomerDetail from './pages/CustomerDetail';
import SaleOrderDetail from './pages/SaleOrderDetail';
import SaleOrder from './pages/SaleOrder';
import Inquiry from './pages/Inquiry';
import NewInquiry from './pages/NewInquiry';
import PurchaseOrder from './pages/PurchaseOrder';
import PurchaseOrderDetail from './pages/PurchaseOrderDetail';
import Supplier from './pages/Supplier';
import NewSupplier from './pages/NewSupplier';
import SupplierDetail from './pages/SupplierDetail';
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
    <Route path="quotation/new" component={NewSaleOrder} />
    <Route path="quotation/edit/:id" component={NewSaleOrder} />
    <Route path="quotation/:id" component={SaleOrderDetail} />
    <Route path="order" component={SaleOrder} />
    <Route path="order/new" component={NewSaleOrder} />
    <Route path="order/edit/:id" component={NewSaleOrder} />
    <Route path="order/:id" component={SaleOrderDetail} />
    <Route path="product" component={Product} />
    <Route path="product/new" component={NewProduct} />
    <Route path="product/:id" component={ProductDetail} />
    <Route path="customer" component={Customer} />
    <Route path="customer/new" component={NewCustomer} />
    <Route path="customer/edit/:id" component={NewCustomer} />
    <Route path="customer/:id" component={CustomerDetail} />
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
    <Route path="inquiry/new" component={NewInquiry} />
    <Route path="inquiry/edit/:id" component={NewInquiry} />
    <Route path="inquiry/:id" component={PurchaseOrderDetail} />
    <Route path="order" component={PurchaseOrder} />
    <Route path="order/new" component={NewInquiry} />
    <Route path="order/edit/:id" component={NewInquiry} />
    <Route path="order/:id" component={PurchaseOrderDetail} />
    <Route path="supplier" component={Supplier} />
    <Route path="supplier/new" component={NewSupplier} />
    <Route path="supplier/edit/:id" component={NewSupplier} />
    <Route path="supplier/:id" component={SupplierDetail} />
    <Route path="product" component={Product} />
    <Route path="product/new" component={NewProduct} />
    <Route path="product/:id" component={ProductDetail} />
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
