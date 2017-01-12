import React, {Component} from 'react';
import {Link} from 'react-router';
import ShowPassword from '../components/ShowPassword';
import '../styles/Login.sass';

export default class Register extends Component {
	state = {show: false};

	showPassword = () => {
		this.setState({show: !this.state.show});
	};

	render() {
		return (
			<div id="register">
				<div id="form">
					<div id="form_wrapper" >
						<h1 id="title">注册</h1>
						<p>已有账号? <Link to="/login">立即登录</Link></p>
						<div id="warning">
						hhhhhhhhhhhhhhhh
						</div>
						<div className="field-wrapper">
							<label htmlFor="email">邮箱：</label>
							<input type="text" name="email" id="email" />
						</div>
						<div className="field-wrapper">
							<label htmlFor="username">用户名：</label>
							<input type="text" name="username" id="username" />
						</div>
						<div className="field-wrapper">
							<label htmlFor="password">密码：<ShowPassword className="fr" show={this.state.show} onClick={this.showPassword} /></label>
							<input type={this.state.show ? "text" : "password"} name="password" id="password" />
						</div>
						<div id="require">
							aaaaaaaaaaaaa
						</div>
						<button>注册</button>
					</div>
				</div>
			</div>
		);
	}
}