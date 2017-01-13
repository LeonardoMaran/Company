import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import ShowPassword from '../components/ShowPassword';
import ApiCaller from '../lib/ApiCaller';
import Session from '../lib/Session';
import '../styles/Login.sass';

export default class Login extends Component {
	state = {show: false, message: ''};

	showPassword = () => {
		this.setState({show: !this.state.show});
	}

	login = () => {
		ApiCaller.postData('/account/login', {
			'username': this.refs.username.value,
			'password': this.refs.password.value
		}, (result, error) => {
			if (result.status == 200) {
				let account = result.body;
        Session.login(account);
        browserHistory.push('/config/users');
			} else {
				this.setState({message: result.text});
			}
		});
	}

	render() {
		let error_message = this.state.message;
		return (
	  	<div id="login">
				<div id="form">
					<div id="form_wrapper" >
						<h1 id="title">登录</h1>
						<p>需要一个账号吗？<Link to="/register">注册</Link></p>
						{error_message != '' ? <div id="warning">{error_message}</div> : null}
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
