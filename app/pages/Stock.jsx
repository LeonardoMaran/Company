import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';

export default class Stock extends Component {
  render() {
    let goodsList = [
      {status: '1'},
      {status: '1'},
      {status: '1'},
      {status: '1'}
    ]
    let fields = [
     {label: '预计日期', name: 'status'},
     {label: '日期', name: 'status'},
     {label: '源单据', name: 'status'},
     {label: '产品', name: 'status'},
     {label: '数量', name: 'status'},
     {label: '状态', name: 'status'}
    ];
    return (
      <div id="stock">
        <h1>进货的产品</h1>
        <Link to="/sales/product/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={goodsList} />
      </div>
    );
  }
}
