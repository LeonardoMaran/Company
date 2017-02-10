import React, {Component} from 'react';
import {Link} from 'react-router';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import DataTable from '../components/DataTable';
import ApiCaller from '../lib/ApiCaller';

export default class PurchaseOrder extends Component {
  state = {message: '', orders: [], status: "loading"};

  getPurchaseOrder = () => {
    ApiCaller.loadData(`/api/purchase`, {
      query: {"state": "采购订单"},
      page: 1,
      size: 10
    }, (result, error) => {
      if(result.status == 200) {
        let orders = result.body.item;
        this.setState({orders, status: orders.isEmpty() ? "empty" : "nonempty"});
      } else {
        this.setState({message: result.text});
      }
    });
  }

  openDelete = (orderId) => {
    this.setState({orderId});
    this.refs.delete.open();
  };

  deletePurchaseOrder = () => {
    ApiCaller.deleteData(`/api/purchase/${this.state.orderId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getPurchaseOrder();
        this.refs.delete.close();
      } else {
        this.setState({message: '要删除采购订单，你必须先取消它'});
      }
    })
  };

  componentDidMount() {
    this.getPurchaseOrder();
  }
  
  render() {
    let fields = [
     {label: '参考', name: 'id'},
     {label: '单据日期', name: 'status'},
     {label: '供应商', compute: item => item.supplier ? item.supplier.name : null},
     {label: '安排的日期', name: 'status'},
     {label: '源单据', name: 'status'},
     {label: '不含税', name: 'status'},
     {label: '总计', name: 'status'},
     {label: '状态', name: 'state'},
     {label: '操作', compute: item => <div>
       <Link style={{margin: '5px'}} to={`/purchase/order/${item.id}`} className="btn btn-default">查看详情</Link>
       <button onClick={() => this.openDelete(item.id)} className="btn btn-primary">删除</button>
     </div>}
    ];

    return (
      <div id="inquiry">
        <h1>采购订单</h1>
        <Link to="/purchase/order/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.orders} />

        <Dialog ref="delete">
          <DialogHeader> 删除采购订单 </DialogHeader>
          <DialogBody> 确认删除 </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.deletePurchaseOrder}>删除</button>
            <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
