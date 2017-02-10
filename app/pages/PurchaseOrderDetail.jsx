import React, {Component} from 'react';
import {Link} from 'react-router';
import PurchaseBar from '../components/PurchaseBar';
import ApiCaller from '../lib/ApiCaller';

export default class PurchaseOrderDetail extends Component {
  state = {message: '', order: {supplier: {}}};

  componentDidMount() {
    ApiCaller.loadData(`/api/purchase/${this.props.params.id}`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({order: result.body});
      } else {
        this.setState({message: result.text});
      }
    })
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
    return (
      <div id="purchase_detail">
        <h1>{title} / {order.id}</h1>
        <Link className="btn btn-primary" to={`/purchase/${pathname[0]}/edit/${this.props.params.id}`} style={{margin: '0 5px 10px 0'}}>编辑</Link>
        <Link className="btn btn-default" to={`/purchase/${pathname[0]}/new`} style={{margin: '0 5px 10px 0'}}>创建</Link>
        <PurchaseBar orderId={this.props.params.id} />
        <div style={{display: 'flex', marginBottom: '30px'}}>
          <table style={{width: '50%'}}>
            <tbody>
              <tr>
                <td>供应商</td>
                <td>{order.supplier.name}</td>
              </tr>
              <tr>
                <td>供应商单号</td>
                <td>{order.supplier_ref}</td>
              </tr>
            </tbody>
          </table>
          <table style={{width: '50%'}}>
            <tbody>
              <tr>
                <td>单据日期</td>
                <td>{order.date_order}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="error">{this.state.message}</p>
      </div>
    );
  }
}
