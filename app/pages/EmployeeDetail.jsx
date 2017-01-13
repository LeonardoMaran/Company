import React, {Component} from 'react';
import Tabs from '../components/Tabs';
import ApiCaller from '../lib/ApiCaller';

export default class EmployeeDetail extends Component {
  state = {employee_detail: {}};

  componentDidMount() {
    ApiCaller.loadData(`/api/employee/${this.props.params.id}`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({employee_detail: result.body});
      }
    });
  }

  render() {
    let employee_detail = this.state.employee_detail;
    return (
      <div>
        <p>{employee_detail.name}</p>
        <Tabs style={{marginTop: '20px'}}>
          <div title="通用信息">
            1111
          </div>
          <div title="哈哈哈">
            2222
          </div>
        </Tabs>
        <p>管理员 {employee_detail.manager}</p>
        <p>上级部门 {employee_detail.parent_department}</p>
      </div>
    );
  }
}
