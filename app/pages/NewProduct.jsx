import React, {Component} from 'react';
import Tabs from '../components/Tabs';

export default class NewProduct extends Component {
  render() {
    //单击去定义新产品.
    //您必须为销售的所有内容定义产品，无论是实体产品，消耗品还是为客户提供的服务。
    //产品表单中的信息可以简化销售流程: 价格，询价单中的注释，会计信息，补货方式等等
    return (
      <div className="wrap">
        <h1>新建</h1>
        <p>产品名称</p>
        <input ref="" placeholder="产品名称" />
        <p><input type="checkbox" />销售</p>
        <p><input type="checkbox" />采购</p>
        <img />
        <Tabs>
          <div title="通用信息">
            11
          </div>
          <div title="销售">
            22
          </div>
        </Tabs>
      </div>
    );
  }
}
