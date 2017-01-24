import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import SelectBox from '../components/SelectBox';
import Tabs from '../components/Tabs';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody} from '../components/Dialog';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';

export default class NewQuotation extends Component {
  state = {customers: [], payments: ["货到付款", "15天", "货到30天"]};

  save = () => {
    ApiCaller.postData(`/api/`)
    browserHistory.push('/sales/quotation');
  }

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
    })
  }

  render() {
    let fields = [
     {label: '名字', name: 'name'},
     {label: '电话', name: 'phone'},
     {label: 'Email', name: 'email'}
    ];
    return (
      <div>
        <h1>报价单 / 新建</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <table style={{width: '100%'}}>
          <tbody>
            <tr>
              <td rowSpan="3" style={{verticalAlign: 'top'}}>客户</td>
              <td rowSpan="3" style={{verticalAlign: 'top'}}>
                <SelectBox ref="select_customer" width={280}
                  options={this.state.customers.map(customer =>
                  {return {item: customer, value: customer.id, label: customer.name}})}>
                  {this.state.total > 5 ? <button className="btn btn-default" style={{marginTop: "10px", width: "100%"}} onClick={() => this.refs.more_customer.open()}>搜索更多</button> : null}
                  <Link className="btn btn-default" style={{marginTop: "10px", width: "100%"}} to="/sales/customer/new">创建新客户</Link>
                </SelectBox>
              </td>
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
                <SelectBox ref="select_customer" width={280}
                  options={this.state.payments.map(payment =>
                  {return {item: payment, value: payment, label: payment}})}>
                  <Link className="btn btn-default" style={{marginTop: "10px", width: "100%"}} to="/sales/customer/new">创建新客户</Link>
                </SelectBox>
              </td>
            </tr>
          </tbody>
        </table>
        <Tabs>
          <div title="订单行">

          </div>
          <div title="其他信息">
送货信息
贸易术语		送货策略
销售信息
销售员
标签
销售团队
直销
客户单号
开票
财政状况
报告
源单据
Campaign
Medium
Source
商机
          </div>
        </Tabs>

        <Dialog ref="more_customer">
          <DialogHeader> 客户 </DialogHeader>
          <DialogBody>
            <DataTable fields={fields} items={this.state.customers} />
          </DialogBody>
        </Dialog>
      </div>
    );
  }
}
