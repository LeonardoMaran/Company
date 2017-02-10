import React, {Component} from 'react';
import Tabs from '../components/Tabs';
import TextInput from '../components/TextInput';
import '../styles/Customer.sass';

export default class Customer extends Component {
	render() {
		return (
			<div>
				<h1><TextInput ref="name" value={customer.name} onChange={this.changeFieldValue("name")} className="name border-bottom-input" placeholder="名字" /></h1>
				<p><TextInput ref="company" value={customer.company} onChange={this.changeFieldValue("company")} className="border-bottom-input" placeholder="公司" /></p>
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
								<td><TextInput ref="street" value={customer.street} onChange={this.changeFieldValue("street")} placeholder="街道" /></td>
							</tr>
							<tr>
								<td>网站</td>
								<td><TextInput ref="website" value={customer.website} onChange={this.changeFieldValue("website")} placeholder="例如：www.cctv.com" /></td>
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
								<td><TextInput ref="function" value={customer.function} onChange={this.changeFieldValue("function")} /></td>
							</tr>
							<tr>
								<td>电话</td>
								<td><TextInput ref="phone" value={customer.phone} onChange={this.changeFieldValue("phone")} /></td>
							</tr>
							<tr>
								<td>手机</td>
								<td><TextInput ref="mobile" value={customer.mobile} onChange={this.changeFieldValue("mobile")} /></td>
							</tr>
							<tr>
								<td>传真</td>
								<td><TextInput ref="fax" value={customer.fax} onChange={this.changeFieldValue("fax")} /></td>
							</tr>
							<tr>
								<td>Email</td>
								<td><TextInput ref="email" value={customer.email} onChange={this.changeFieldValue("email")} /></td>
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
		);
	}
}
