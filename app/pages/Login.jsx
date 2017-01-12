import React, {Component} from 'react';
import {Link} from 'react-router';
import ShowPassword from '../components/ShowPassword';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Login.sass';

export default class Login extends Component {
	state = {show: false};

	showPassword = () => {
		this.setState({show: !this.state.show});
	}

	login = () => {
		ApiCaller.postData('/account/login', {
			'username': this.refs.username.value,
			'password': this.refs.password.value
		}, result => {

		});
	}

	render() {
		return (
	  	<div id="login">
				<div id="form">
					<div id="form_wrapper" >
						<h1 id="title">登录</h1>
						<p>需要一个账号吗？<Link to="/register">注册</Link></p>
						<div id="warning">
						hhhhhhhhhhhhhhhh
						</div>
						<div className="field-wrapper">
							<label htmlFor="username">用户名：</label>
							<input ref="username" type="text" name="username" id="username" />
						</div>
						<div className="field-wrapper">
							<label htmlFor="password">密码：<ShowPassword className="fr" show={this.state.show} onClick={this.showPassword} /></label>
							<input ref="password" type={this.state.show ? "text" : "password"} name="password" id="password" />
						</div>
						<button onClick={this.login}>登录</button>
					</div>
				</div>
			</div>
		);
	}
}
