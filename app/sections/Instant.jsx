import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import ShowPassword from '../components/ShowPassword';
import ApiCaller from '../lib/ApiCaller';
import Session from '../lib/Session';
import '../styles/Login.sass';

export default class Instant extends Component {
	state = {show: false, message: ''};

	showPassword = () => {
		this.setState({show: !this.state.show});
	};

	instant = () => {
		let [username, password, email] = [this.refs.username.value, this.refs.password.value, this.refs.email.value];
    ApiCaller.postData(`/api/admin`, {
      "username": username,
      "password": password,
      "email": email,
    }, (result, error) => {
      if(result.status == 200) {
				ApiCaller.postData('/account/login', {
					'username': username,
					'password': password
				}, (result, error) => {
					if (result.status == 200) {
						let account = result.body;
		        Session.login(account);
		        browserHistory.push('/config/user');
					}
				});
      } else {
				this.setState({message: result.text});
			}
    });
	}

	render() {
		return (
			<div id="instant">
				<div id="form">
					<div id="form_wrapper" >
						<h1 id="title">初始化</h1>
						{
							this.state.message
							? <div id="warning">{this.state.message}</div>
							: null
						}
						<div className="field-wrapper">
							<label htmlFor="email">邮箱：</label>
							<input ref="email" type="text" name="email" id="email" />
						</div>
						<div className="field-wrapper">
							<label htmlFor="username">用户名：</label>
							<input ref="username" type="text" name="username" id="username" />
						</div>
						<div className="field-wrapper">
							<label htmlFor="password">密码：<ShowPassword className="fr" show={this.state.show} onClick={this.showPassword} /></label>
							<input ref="password" type={this.state.show ? "text" : "password"} name="password" id="password" />
						</div>
						{/*<div id="require">
							aaaaaaaaaaaaa
						</div>*/}
						<button onClick={this.instant}>现在开始</button>
					</div>
				</div>
			</div>
		);
	}
}
