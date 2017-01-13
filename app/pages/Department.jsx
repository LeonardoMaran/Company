import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import ApiCaller from '../lib/ApiCaller';

export default class Department extends Component {
  state = {departments: []};

  componentDidMount() {
    ApiCaller.loadData(`/api/department`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({departments: result.body.item});
      } else {
				this.setState({message: result.text});
      }
    });
  }

  render() {
    let fields = [
     {label: '名字', name: 'name'},
     {label: '管理员', name: 'status'},
     {label: '上级部门', name: 'status'},
     {label: '操作', compute: item => <div>
       <Link className="btn btn-default" style={{margin: '5px'}} to={`/hr/department/${item.id}`}>查看详情</Link>
       <button className="btn btn-primary">删除</button>
       </div>
     }
    ];
    return (
      <div id="department">
        <h1>部门</h1>
        <Link to="/hr/department/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.departments} />
      </div>
    );
  }
}
