import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TopBar from './components/TopBar';
import Accordion, {AccordionElement, AccordionItem} from './components/Accordion';
import './styles/Layout.sass';

export default function Layout(props) {
  let pathname = props.location.pathname;
  return (
    <div>
      <TopBar />
      <div id="layout">
        <div className="navbar">
          <Accordion>
            <AccordionElement title="产品">
              <AccordionItem to="/product/brand">品牌列表</AccordionItem>
              <AccordionItem to="/product/list">产品目录</AccordionItem>
            </AccordionElement>

            <AccordionElement title="采购">
              <AccordionItem to="/purchase/inquiry">询价单</AccordionItem>
              <AccordionItem to="/purchase/order">采购订单</AccordionItem>
              <AccordionItem to="/purchase/supplier">供应商</AccordionItem>
            </AccordionElement>

            <AccordionElement title="销售">
              <AccordionItem to="/sales/inquiry">报价单</AccordionItem>
              <AccordionItem to="/sales/order">销售订单</AccordionItem>
              <AccordionItem to="/sales/supplier">客户</AccordionItem>
            </AccordionElement>

            <AccordionElement title="员工">
                <AccordionItem to="/hr/employee">员工</AccordionItem>
                <AccordionItem to="/hr/department">部门</AccordionItem>
                <AccordionItem to="/hr/job">工作岗位</AccordionItem>
            </AccordionElement>

            <AccordionElement title="库存">
              <AccordionItem to="/inventory/product">产品</AccordionItem>
            </AccordionElement>

            <AccordionElement title="设置">
              <AccordionItem to="/config/users">用户</AccordionItem>
              <AccordionItem to="/config/company">公司</AccordionItem>
            </AccordionElement>
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
