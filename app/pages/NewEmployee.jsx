import React, {Component} from 'react';
import Tabs from '../components/Tabs';
import ApiCaller from '../lib/ApiCaller';

export default class NewEmployee extends Component {
  state = {departments: []};

  componentDidMount() {
    ApiCaller.loadData(`/api/department`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({departments: result.body.item});
      }
    });
  }

  render() {
    return (
      <div id="new_employee">
        <h1>员工 / 新建</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <div>
          <p>名字</p>
          <input ref="name" className="name border-bottom-input" />
          <Tabs style={{marginTop: '20px'}}>
            <div title="公开信息" className="wrap">
              <div>
                <p>岗位</p>
                <p>
                  <label><span>部门</span>
                  <select>
                    {this.state.departments.map((department, i) => <option key={i} value={department.id}>{department.name}</option>)}
                  </select>
                  </label>
                </p>
                <p><label><span>工作头衔</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
                <p><label><span>管理员</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
              </div>
            </div>
            <div title="个人信息" className="wrap">
              <p>身份和其它信息</p>
              <p><label><span>国籍(国家)</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
              <p><label><span>身份证号</span><input ref="email" className="border-bottom-input" type="text" /></label></p>
              <p><label><span>护照号</span><input ref="phone" className="border-bottom-input" type="text" /></label></p>
              <p><label><span>银行账户号码</span><input ref="phone" className="border-bottom-input" type="text" /></label></p>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}
