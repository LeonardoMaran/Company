import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Tabs from '../components/Tabs';
import TextInput from '../components/TextInput';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Customer.sass';

export default class NewSupplier extends Component {
  state = {supplier: {}};

  //改变状态的函数
  changeFieldValue = name => {
    return value => {
      this.setState({
        supplier: {
          ...this.state.supplier,
          [name]: value
        }
      });
    };
  };

  save = () => {
    let pathname = this.props.route.path;
    let params = {
      "name": this.refs.name.value,
      "email": this.refs.email.value,
      "phone": this.refs.phone.value,
      "email": this.refs.email.value,
      "fax": this.refs.fax.value,
      "mobile": this.refs.mobile.value,
      "website": this.refs.website.value,
      "function": this.refs.function.value,
      "supplier": true
    };

    if(pathname.split('/')[1] == "edit") {
      ApiCaller
      .updateData('contact', this.props.params.id, params)
      .then(() => {
        browserHistory.push('/purchase/supplier');
      });
    } else {
      ApiCaller.postData(`/api/contact`, params, (result, error) => {
        if(result.status == 200) {
          browserHistory.push('/purchase/supplier');
        } else {
          this.setState({message: result.text});
        }
      });
    }
  }

  componentDidMount() {
    let pathname = this.props.route.path;
    if(pathname.split('/')[1] == "edit") {
      ApiCaller.loadData(`/api/contact/${this.props.params.id}`, {}, (result, error) => {
        if(result.status == 200) {
          this.setState({supplier: result.body});
        } else {
          this.setState({message: result.text});
        }
      });
    }
  }

  render() {
    let supplier = this.state.supplier;
    let pathname = this.props.route.path;

    return (
      <div id="new_supplier">
        <h1>供应商 / 新建</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
  			<div>
  				<h1><TextInput ref="name" value={supplier.name} onChange={this.changeFieldValue("name")} className="name border-bottom-input" placeholder="名字" /></h1>
  				<p><TextInput ref="company" value={supplier.company} onChange={this.changeFieldValue("company")} className="border-bottom-input" placeholder="公司" /></p>
  				<div className="table_wrap">
  					<table>
  						<tbody>
  							<tr>
  								<td rowSpan="3" style={{verticalAlign: 'top'}}>地址</td>
  								<td><input type="text" placeholder="街道" /></td>
  							</tr>
  							<tr>
  								<td><input type="text" placeholder="街道" /></td>
  							</tr>
  							<tr>
  								<td><TextInput ref="street" value={supplier.street} onChange={this.changeFieldValue("street")} placeholder="街道" /></td>
  							</tr>
  							<tr>
  								<td>网站</td>
  								<td><TextInput ref="website" value={supplier.website} onChange={this.changeFieldValue("website")} placeholder="例如：www.cctv.com" /></td>
  							</tr>
  							<tr>
  								<td>标签</td>
  								<td><input type="text" /></td>
  							</tr>
  						</tbody>
  					</table>
  					<table>
  						<tbody>
  							<tr>
  								<td>工作岗位</td>
  								<td><TextInput ref="function" value={supplier.function} onChange={this.changeFieldValue("function")} /></td>
  							</tr>
  							<tr>
  								<td>电话</td>
  								<td><TextInput ref="phone" value={supplier.phone} onChange={this.changeFieldValue("phone")} /></td>
  							</tr>
  							<tr>
  								<td>手机</td>
  								<td><TextInput ref="mobile" value={supplier.mobile} onChange={this.changeFieldValue("mobile")} /></td>
  							</tr>
  							<tr>
  								<td>传真</td>
  								<td><TextInput ref="fax" value={supplier.fax} onChange={this.changeFieldValue("fax")} /></td>
  							</tr>
  							<tr>
  								<td>Email</td>
  								<td><TextInput ref="email" value={supplier.email} onChange={this.changeFieldValue("email")} /></td>
  							</tr>
  							<tr>
  								<td>称谓</td>
  								<td><input type="text" /></td>
  							</tr>
  						</tbody>
  					</table>
  				</div>
  				<Tabs>
  					<div title="内部备注">
  						<textarea placeholder="内部备注"></textarea>
  					</div>
  					<div title="销售与采购">

  					</div>
  				</Tabs>
  			</div>
      </div>
    )
  }
}
