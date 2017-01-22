import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';

export default class SalesOrder extends Component {
  render() {
    let goodsList = [
      {status: '1'},
      {status: '1'},
      {status: '1'},
      {status: '1'}
    ]
    let fields = [
     {label: '报价单号码', name: 'status'},
     {label: '单据日期', name: 'status'},
     {label: '客户', name: 'status'},
     {label: '销售员', name: 'status'},
     {label: '总计', name: 'status'},
     {label: '发票状态', compute: item => <button className="btn btn-primary">删除</button>}
    ];
    return (
      <div id="order">
        <h1>销售订单</h1>
        <Link to="/config/user/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={goodsList} />
      </div>
    );
  }
}
