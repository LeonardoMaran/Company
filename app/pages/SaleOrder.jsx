import React, {Component} from 'react';
import {Link} from 'react-router';
import {formatDate, formatTime} from '../lib';
import DataTable from '../components/DataTable';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';

export default class SaleOrder extends Component {
  state = {orders: []};

  componentDidMount() {
    let account = Session.current();
    ApiCaller.loadData(`/api/sale`, {
      query: {"state": "销售订单", "write_account": account.username},
      page: 1,
      size: 10
    }, (result, error) => {
      if(result.status == 200) {
        this.setState({orders: result.body.item});
      } else {
        this.setState({message: result.text});
      }
    })
  }

  render() {
    let fields = [
     {label: '订单号码', name: 'id'},
     {label: '单据日期', compute: item => formatDate(item.create_date)},
     {label: '客户', compute: item => item.customer ? item.customer.name : null},
     {label: '销售员', compute: item => item.saler ? item.saler.username : null},
     {label: '总计', name: 'amount_total'},
     {label: '操作', compute: item => <div>
       <Link style={{margin: '5px'}} to={`/sales/order/${item.id}`} className="btn btn-default">查看详情</Link>
       <button onClick={() => this.openDelete(item.id)} className="btn btn-primary">删除</button>
     </div>}
    ];
    return (
      <div id="order">
        <h1>销售订单</h1>
        <Link to="/sales/order/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.orders} />
      </div>
    );
  }
}
