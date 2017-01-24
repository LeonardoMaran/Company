import React, {Component} from 'react';
import {Link} from 'react-router';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Customer.sass';

export default class CustomerDetail extends Component {
  state = {customer: {}, message: ''};

  componentDidMount() {
    ApiCaller.loadData(`/api/contact/${this.props.params.id}`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({customer: result.body});
      } else {
        this.setState({message: result.text});
      }
    })
  }

  render() {
    let customer = this.state.customer;
    return (
      <div id="customer_detail">
        <h1>客户 / {customer.name}</h1>
        <Link to={`/sales/customer/edit/${this.props.params.id}`} className="btn btn-primary" style={{marginBottom: '10px'}}>编辑</Link>
        <h1>{customer.name}</h1>
        <div className="table_wrap">
          <table>
            <tbody>
              <tr>
                <td rowSpan="3" style={{verticalAlign: 'top'}}>地址</td>
                <td>{customer.province}</td>
              </tr>
              <tr>
                <td>{customer.city}</td>
              </tr>
              <tr>
                <td>{customer.street}</td>
              </tr>
              <tr>
                <td>网站</td>
                <td>{customer.website}</td>
              </tr>
              <tr>
                <td>标签</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>工作岗位</td>
                <td>{customer.function}</td>
              </tr>
              <tr>
                <td>电话</td>
                <td>{customer.phone}</td>
              </tr>
              <tr>
                <td>手机</td>
                <td>{customer.mobile}</td>
              </tr>
              <tr>
                <td>传真</td>
                <td>{customer.fax}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <td>称谓</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="error">{this.state.message}</p>
      </div>
    );
  }
}
