import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import ApiCaller from '../lib/ApiCaller';
import Session from '../lib/Session';

export default class Customer extends Component {
  state = {customers: []};

  componentDidMount() {
    let account = Session.current();
    ApiCaller.loadData(`/api/contact`, {
      query: {"customer": true, "write_account": account.username}
    }, (result, error) => {
      if(result.status == 200) {
        this.setState({customers: result.body.item});
      } else {
        this.setState({message: result.text});
      }
    });
  }

  render() {
    let fields = [
     {label: '名字', name: 'name'},
     {label: '电话', name: 'phone'},
     {label: 'Email', name: 'email'},
     {label: '操作', compute: item => <div>
       <Link className="btn btn-default" style={{margin: '5px'}} to={`/sales/customer/${item.id}`}>查看详情</Link>
       <button className="btn btn-primary">删除</button>
      </div>
     }
    ];

    return (
      <div id="customer">
        <h1>客户</h1>
        <Link to="/sales/customer/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.customers} />
      </div>
    );
  }
}
