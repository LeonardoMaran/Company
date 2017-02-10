import React, {Component} from 'react';
import {Link} from 'react-router';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Customer.sass';

export default class SupplierDetail extends Component {
  state = {supplier: {}, message: ''};

  componentDidMount() {
    ApiCaller.loadData(`/api/contact/${this.props.params.id}`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({supplier: result.body});
      } else {
        this.setState({message: result.text});
      }
    })
  }

  render() {
    let supplier = this.state.supplier;
    return (
      <div id="supplier_detail">
        <h1>供应商 / {supplier.name}</h1>
        <Link to={`/purchase/supplier/edit/${this.props.params.id}`} className="btn btn-primary" style={{marginBottom: '10px'}}>编辑</Link>
        <h1>{supplier.name}</h1>
        <div className="table_wrap">
          <table>
            <tbody>
              <tr>
                <td rowSpan="3" style={{verticalAlign: 'top'}}>地址</td>
                <td>{supplier.province}</td>
              </tr>
              <tr>
                <td>{supplier.city}</td>
              </tr>
              <tr>
                <td>{supplier.street}</td>
              </tr>
              <tr>
                <td>网站</td>
                <td>{supplier.website}</td>
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
                <td>{supplier.function}</td>
              </tr>
              <tr>
                <td>电话</td>
                <td>{supplier.phone}</td>
              </tr>
              <tr>
                <td>手机</td>
                <td>{supplier.mobile}</td>
              </tr>
              <tr>
                <td>传真</td>
                <td>{supplier.fax}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{supplier.email}</td>
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
