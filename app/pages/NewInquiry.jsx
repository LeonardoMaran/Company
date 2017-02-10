import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import SelectBox from '../components/SelectBox';
import Tabs from '../components/Tabs';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody} from '../components/Dialog';
import PurchaseBar from '../components/PurchaseBar';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';

export default class NewInquiry extends Component {
  state = {suppliers: [], salers: [], order: {}, message: '', lines: [], payments: ["15天", "货到付款", "货到30天"]};

  save = () => {
    ApiCaller.postData(`/api/purchase`, {
      "supplier_id": this.refs.supplier_id.value,
      "state": "询价单"
    }, (result, error) => {
      if(result.status == 200) {
        browserHistory.push("/purchase/inquiry");
      } else {
        this.setState({message: result.text});
      }
    });
  };

  componentDidMount() {
    ApiCaller.loadData('/api/contact', {
      query: {"supplier": true},
    }, (result, error) => {
      if(result.status == 200) {
        this.setState({suppliers: result.body.item});
      }
    });
  }

  render() {
    let order = this.state.order;
    let pathname = this.props.route.path.split('/');
    let title = "";
    switch(pathname[0]) {
      case "inquiry":
        title = "询价单";
        break;
      case "order":
        title = "采购订单";
        break;
    }

    let customer_fields = [
     {label: '名字', name: 'name'},
     {label: '电话', name: 'phone'},
     {label: 'Email', name: 'email'}
    ];
    let line_fields = [
      {label: '产品', name: ''},
      {label: '说明', name: ''},
      {label: '订购数量', name: ''},
      {label: '单价', name: ''},
      {label: '税金', name: ''},
      {label: '小计', name: ''}
    ];
    return (
      <div id="new_inquiry">
        <h1>{title} / {pathname[1] == "edit" ? "编辑" : "新建"}</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <Link to={pathname[1] == "edit" ? `/purchase/${pathname[0]}/${this.props.params.id}` : `/purchase/${pathname[0]}`} className="btn btn-default" style={{marginBottom: '10px', marginLeft: '10px'}}>丢弃</Link>
        {pathname[1] == "edit" ? <PurchaseBar orderId={this.props.params.id} /> : null}
        <div style={{display: 'flex', marginBottom: '30px'}}>
          <table style={{width: '50%'}}>
            <tbody>
              <tr>
                <td>供应商</td>
                <td>
                  <SelectBox ref="supplier_id" width={280} option={order.customer}
                    options={this.state.suppliers.map(supplier =>
                    {return {item: supplier, value: supplier.id, label: supplier.name}})}>
                    {this.state.total > 5 ? <button className="btn btn-default" style={{marginTop: "10px", width: "100%"}} onClick={() => this.refs.more_customer.open()}>搜索更多</button> : null}
                    <Link className="btn btn-default" style={{marginTop: "10px", width: "100%"}} to="/purchase/supplier/new">创建新供应商</Link>
                  </SelectBox>
                </td>
              </tr>
              <tr>
                <td>供应商单号</td>
                <td><input style={{width: '280px'}} /></td>
              </tr>
            </tbody>
          </table>
          <table style={{width: '50%'}}>
            <tbody>
              <tr>
                <td>单据日期</td>
                <td><input style={{width: '280px'}} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Tabs>
          <div title="产品">
            <DataTable fields={line_fields} items={this.state.lines} />
            <button className="btn btn-primary">添加项目</button>
          </div>
          <div title="交货及发票">
            <p>预定交货日期	<input style={{width: '280px'}} /></p>
          </div>
        </Tabs>
        <p className="error">{this.state.message}</p>

        <Dialog ref="more_customer">
          <DialogHeader> 客户 </DialogHeader>
          <DialogBody>
            <DataTable fields={customer_fields} items={this.state.suppliers} />
          </DialogBody>
        </Dialog>
      </div>
    );
  }
}
