import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';

export default class PurchaseOrder extends Component {
  render() {
    let goodsList = [
      {status: '1'},
      {status: '1'},
      {status: '1'},
      {status: '1'}
    ]
    let fields = [
     {label: '参考', name: 'status'},
     {label: '单据日期', name: 'status'},
     {label: '供应商', name: 'status'},
     {label: '安排的日期', name: 'status'},
     {label: '源单据', name: 'status'},
     {label: '不含税', name: 'status'},
     {label: '总计', name: 'status'},
     {label: '状态', name: 'status'},
     {label: '账单状态', name: 'status'}
    ];
    return (
      <div id="inquiry">
        <h1>采购订单</h1>
        <Link to="/sales/product/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={goodsList} />
      </div>
    );
  }
}
