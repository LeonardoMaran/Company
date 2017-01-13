import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import ApiCaller from '../lib/ApiCaller';

export default class Employee extends Component {
  state = {employees: []};

  componentDidMount() {
    ApiCaller.loadData(`/api/employee`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({employees: result.body.item});
      }
    });
  }

  render() {
    let fields = [
     {label: '名字', name: 'name'},
     {label: '办公电话', name: 'status'},
     {label: '工作Email', name: 'status'},
     {label: '部门', name: 'status'},
     {label: '工作头衔', name: 'status'},
     {label: '管理员', name: 'status'},
     {label: '操作', compute: item => <div>
       <Link className="btn btn-default" style={{margin: '5px'}} to={`/hr/employee/${item.id}`}>查看详情</Link>
       <button className="btn btn-primary">删除</button>
       </div>
     }
    ];

    return (
      <div id="employee">
        <h1>员工</h1>
        <Link to="/hr/employee/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.employees} />
      </div>
    );
  }
}
