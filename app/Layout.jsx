import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TopBar from './components/TopBar';
import Accordion, {AccordionElement, AccordionItem} from './components/Accordion';
import Session from './lib/Session';
import './styles/Layout.sass';

export default function Layout(props) {
  let pathname = props.location.pathname;
  let account = Session.current();
  let moduleArr = [
    {
      name: '产品',
      module: (
        <AccordionElement title="产品">
          <AccordionItem to="/product/brand">品牌列表</AccordionItem>
          <AccordionItem to="/product/list">产品目录</AccordionItem>
        </AccordionElement>
      )
    },
    {
      name: '采购',
      module: (
        <AccordionElement title="采购">
          <AccordionItem to="/purchase/inquiry">询价单</AccordionItem>
          <AccordionItem to="/purchase/order">采购订单</AccordionItem>
          <AccordionItem to="/purchase/supplier">供应商</AccordionItem>
          <AccordionItem to="/purchase/product">产品</AccordionItem>
        </AccordionElement>
      )
    },
    {
      name: '销售',
      module: (
        <AccordionElement title="销售">
          <AccordionItem to="/sales/quotation">报价单</AccordionItem>
          <AccordionItem to="/sales/order">销售订单</AccordionItem>
          <AccordionItem to="/sales/customer">客户</AccordionItem>
          <AccordionItem to="/sales/product">产品</AccordionItem>
        </AccordionElement>
      )
    },
    {
      name: '库存',
      module: (
        <AccordionElement title="库存">
          <AccordionItem to="/inventory/product">产品</AccordionItem>
        </AccordionElement>
      )
    },
    {
      name: '员工',
      module: (
        <AccordionElement title="员工">
            <AccordionItem to="/hr/employee">员工</AccordionItem>
            <AccordionItem to="/hr/department">部门</AccordionItem>
            <AccordionItem to="/hr/job">工作岗位</AccordionItem>
        </AccordionElement>
      )
    },
    {
      name: '设置',
      module: (
        <AccordionElement title="设置">
          <AccordionItem to="/config/user">用户</AccordionItem>
          <AccordionItem to="/config/company">公司</AccordionItem>
          <AccordionItem to="/config/role">角色</AccordionItem>
          <AccordionItem to="/config/permission">权限</AccordionItem>
        </AccordionElement>
      )
    }
  ];
  return (
    <div>
      <TopBar />
      <div id="layout">
        <div className="navbar">
          <Accordion>
          {
            account != null
            ? moduleArr.map(module => account.role.permission.includes(module.name) ? module.module : null)
            : null
          }
          </Accordion>
        </div>
        <div className="container">
          {props.children}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
