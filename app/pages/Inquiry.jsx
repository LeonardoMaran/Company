import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';
import '../styles/PurchaseOrder.sass';

export default class Inquiry extends Component {
  state = {orders: [], message: '', inquiryId: null, status: "loading"};

  getIquiry = () => {
    ApiCaller.loadData(`/api/purchase`, {}, (result, error) => {
      if(result.status == 200) {
        let orders = result.body.item;
        this.setState({orders, status: orders.isEmpty() ? "empty" : "nonempty"});
      } else {
        this.setState({message: result.text});
      }
    });
  }

  openDelete = (inquiryId) => {
    this.setState({inquiryId});
    this.refs.delete.open();
  };

  deleteInquiry = () => {
    ApiCaller.deleteData(`/api/purchase/${this.state.inquiryId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getIquiry();
        this.refs.delete.close();
      } else {
        this.setState({message: '要删除采购订单，你必须先取消它'});
      }
    })
  };

  componentDidMount() {
    this.getIquiry();
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
       <Link style={{margin: '5px'}} to={`/purchase/inquiry/${item.id}`} className="btn btn-default">查看详情</Link>
       <button onClick={() => this.openDelete(item.id)} className="btn btn-primary">删除</button>
     </div>}
    ];

    switch(this.state.status) {
      case "loading":
        return <div></div>;
      case "empty":
        return (
          <div id="inquiry">
            <h1>询价单</h1>
            <Link to="/purchase/inquiry/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
            <div className="blank_wrap">
              <p>单击创建询价单</p>
              <p>报价单包含了你和供应商的讨论/协商的历史记录。一旦确认了这张订单，询价就转换为采购订单。</p>
              <p>大部分的采购订单都有Odoo根据库存需求自动生成</p>
            </div>
          </div>
        );
      case "nonempty":
        return (
          <div id="inquiry">
            <h1>询价单</h1>
            <Link to="/purchase/inquiry/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
            <DataTable fields={fields} items={this.state.orders} />

            <Dialog ref="delete">
              <DialogHeader> 删除询价单 </DialogHeader>
              <DialogBody> 确认删除 </DialogBody>
              <DialogFooter>
                <button className="btn btn-primary" onClick={this.deleteInquiry}>删除</button>
                <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
              </DialogFooter>
            </Dialog>
          </div>
        );
    }
  }
}
