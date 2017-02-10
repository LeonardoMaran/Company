import React, {Component} from 'react';
import {Link} from 'react-router';
import {formatDate, formatTime} from '../lib';
import Tabs from '../components/Tabs';
import SaleBar from '../components/SaleBar';
import ApiCaller from '../lib/ApiCaller';
import '../styles/SaleOrder.sass';

export default class SaleOrderDetail extends Component {
  state = {order: {customer: {}}};

  componentDidMount() {
    ApiCaller.loadData(`/api/sale/${this.props.params.id}`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({order: result.body});
      }
    })
  }

  render() {
    let pathname = this.props.route.path.split("/")[0];
    let order = this.state.order;
    let customer = this.state.order.customer;

    let title = "";
    switch(pathname) {
      case "quotation":
        title = "报价单";
        break;
      case "order":
        title = "销售订单";
        break;
    }

    return (
      <div id="sale_order_detail">
        <h1>{title} / {order.id}</h1>
        <Link className="btn btn-primary" to={`/sales/${pathname}/edit/${this.props.params.id}`} style={{margin: '0 5px 10px 0'}}>编辑</Link>
        <Link className="btn btn-default" to={`/sales/${pathname}/new`} style={{margin: '0 5px 10px 0'}}>创建</Link>
        <SaleBar orderId={this.props.params.id} />
        <div style={{display: 'flex', marginBottom: '30px'}}>
          <table>
            <tbody>
              <tr>
                <td>客户</td>
                <td>{customer.name}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>订购日期</td>
                <td>{formatTime(order.create_date)}</td>
              </tr>
              <tr>
                <td>到期日期</td>
                <td>{formatDate(order.create_date)}</td>
              </tr>
              <tr>
                <td>付款条款</td>
                <td>{order.payment_term}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Tabs>
          <div title="订单行">
          </div>
          <div title="其他信息">
          </div>
        </Tabs>
      </div>
    );
  }
}
