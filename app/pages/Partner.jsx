import React, {Component} from 'react';
import '../styles/Partner.sass';

export default class Partner extends Component {
	render() {
		return (
			<div id="partner">
				<div className="contain">
					<form>
						<label><input type="radio" name="type" />个人</label>
						<label><input type="radio" name="type" />公司</label>
						<h1><input type="text" className="reqiured" placeholder="名字" /></h1>
						<p><input type="text" placeholder="公司" /></p>
	          <div className="wrap">
	            <div>
	              <p><label><span>地址</span><input type="text" placeholder="街道" /></label></p>
	              <p><label><span>网站</span><input type="text" placeholder="例如：www.cctv.com" /></label></p>
	              <p><label><span>标签</span><input type="text" /></label></p>
	            </div>
	            <div>
	              <p><label><span>工作岗位</span><input type="text" /></label></p>
	              <p><label><span>电话</span><input type="text" /></label></p>
	              <p><label><span>手机</span><input type="text" /></label></p>
	              <p><label><span>传真</span><input type="text" /></label></p>
	              <p><label><span>Email</span><input type="text" /></label></p>
	              <p><label><span>称谓</span><input type="text" /></label></p>
	            </div>
	          </div>
					</form>
				</div>
			</div>
		);
	}
}
