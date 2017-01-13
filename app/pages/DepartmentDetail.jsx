import React, {Component} from 'react';
import ApiCaller from '../lib/ApiCaller';

export default class DepartmentDetail extends Component {
  state = {department_detail: {}};

  componentDidMount() {
    ApiCaller.loadData(`/api/department/${this.props.params.id}`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({department_detail: result.body});
      }
    });
  }

  render() {
    let department_detail = this.state.department_detail;
    return (
      <div>
        <p>部门名称 {department_detail.name}</p>
        <p>管理员 {department_detail.manager}</p>
        <p>上级部门 {department_detail.parent_department}</p>
      </div>
    );
  }
}
