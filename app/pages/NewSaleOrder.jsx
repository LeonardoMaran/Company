import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import SelectBox from '../components/SelectBox';
import Tabs from '../components/Tabs';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody} from '../components/Dialog';
import SaleBar from '../components/SaleBar';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';

export default class NewSaleOrder extends Component {
  state = {customers: [], salers: [], order: {}, message: '', lines: [], payments: ["15天", "货到付款", "货到30天"]};

  save = () => {
    if(this.refs.partner_id.value) {
      ApiCaller.postData(`/api/sale`, {
        "partner_id": this.refs.partner_id.value,
        "payment_term": this.refs.payment_term.value,
        "saler_id": this.refs.saler_id.value,
        "state": "报价单"
      }, (result, error) => {
        if(result.status == 200) {
          browserHistory.push('/sales/quotation');
        } else {
          this.setState({message: result.text});
        }
      });
    } else {
      this.setState({message: '客户不能为空'});
    }
  };

  componentDidMount() {
    let account = Session.current();
    ApiCaller.loadData(`/api/contact`, {
      query: {"customer": true, "write_account": account.username},
      page: 1,
      size: 5
    }, (result, error) => {
      if(result.status == 200) {
        this.setState({customers: result.body.item, total: result.body.total});
      } else {
        this.setState({message: result.text});
      }
    });

    ApiCaller.loadData(`/api/user`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({salers: result.body.item});
      } else {
        this.setState({message: result.text});
      }
    });


    let pathname = this.props.route.path;
    if(pathname.split('/')[1] == "edit") {
      ApiCaller.loadData(`/api/sale/${this.props.params.id}`, {}, (result, error) => {
        if(result.status == 200) {
          this.setState({order: result.body});
        } else {
          this.setState({message: result.text});
        }
      });
    }
  }

  render() {
    let order = this.state.order;
    let pathname = this.props.route.path.split('/');
    let title = "";
    switch(pathname[0]) {
      case "quotation":
        title = "报价单";
        break;
      case "order":
        title = "销售订单";
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
      <div>
        <h1>{title} / {pathname[1] == "edit" ? "编辑" : "新建"}</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <Link to={pathname[1] == "edit" ? `/sales/${pathname[0]}/${this.props.params.id}` : `/sales/${pathname[0]}`} className="btn btn-default" style={{marginBottom: '10px', marginLeft: '10px'}}>丢弃</Link>
        {pathname[1] == "edit" ? <SaleBar orderId={this.props.params.id} /> : null}
        <div style={{display: 'flex', marginBottom: '30px'}}>
          <table style={{width: '50%'}}>
            <tbody>
              <tr>
                <td>客户</td>
                <td>
                  <SelectBox ref="partner_id" width={280} option={order.customer}
                    options={this.state.customers.map(customer =>
                    {return {item: customer, value: customer.id, label: customer.name}})}>
                    {this.state.total > 5 ? <button className="btn btn-default" style={{marginTop: "10px", width: "100%"}} onClick={() => this.refs.more_customer.open()}>搜索更多</button> : null}
                    <Link className="btn btn-default" style={{marginTop: "10px", width: "100%"}} to="/sales/customer/new">创建新客户</Link>
                  </SelectBox>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{width: '50%'}}>
            <tbody>
              <tr>
                <td>订购日期</td>
                <td><input style={{width: '280px'}} /></td>
              </tr>
              <tr>
                <td>到期日期</td>
                <td><input style={{width: '280px'}} /></td>
              </tr>
              <tr>
                <td>付款条款</td>
                <td>
                  <SelectBox ref="payment_term" width={280}
                    options={this.state.payments.map(payment =>
                    {return {item: payment, value: payment, label: payment}})} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Tabs>
          <div title="订单行">
            <DataTable fields={line_fields} items={this.state.lines} />
            <button className="btn btn-primary">添加项目</button>
          </div>
          <div title="其他信息">
            <h1>销售信息</h1>
            <div>
              <label>销售员</label>
              <SelectBox ref="saler_id" width={280}
                options={this.state.salers.map(saler =>
                {return {item: saler, value: saler.id, label: saler.username}})} />
            </div>
            <p>客户单号 <input style={{width: '280px'}} /></p>
          </div>
        </Tabs>
        <p className="error">{this.state.message}</p>

        <Dialog ref="more_customer">
          <DialogHeader> 客户 </DialogHeader>
          <DialogBody>
            <DataTable fields={customer_fields} items={this.state.customers} />
          </DialogBody>
        </Dialog>
      </div>
    );
  }
}
