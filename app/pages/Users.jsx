import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Users.sass';

export default class Users extends Component {
  state = {users: []};

  openDelete = (userId) => {
    this.setState({userId});
    this.refs.delete.open();
  }

  deleteUser = () => {
    ApiCaller.deleteData(`/api/user/${this.state.userId}`, {}, result => {
      this.getUser();
      this.refs.delete.close();
    })
  }

  getUser = () => {
    ApiCaller.loadData(`/api/user`, {}, result => {
      this.setState({users: result.item});
    });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    let fields = [
     {label: '名字', name: 'realname'},
     {label: '用户名', name: 'username'},
     {label: '邮箱', name: 'email'},
     {label: '最后连接', name: 'last_presence'},
     {label: '操作', compute: item => <div>
       <Link className="btn btn-default" to={`/config/users/${item.id}`} style={{margin: '5px'}}>查看详情</Link>
       <button className="btn btn-primary" onClick={() => this.openDelete(item.id)}>删除</button>
      </div>
     }
    ];
    //你不能删除 admin 用户，因为其由 Odoo 创建并被系统内部使用(更新，模块安装－)
    return (
      <div id="users">
        <h1>用户</h1>
        <Link to="/config/users/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.users} />
        <Dialog ref="delete">
          <DialogHeader> 删除用户 </DialogHeader>
          <DialogBody> 确定删除! </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.deleteUser}>删除</button>
            <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
