import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import ApiCaller from '../lib/ApiCaller';

export default class Permission extends Component {
  state = {permissions: []};

  getPermission = () => {
    ApiCaller.loadData('/api/permission', {}, (result, error) => {
      if(result.status == 200) {
        this.setState({permissions: result.body.item});
      }
    });
  }

  newPermission = () => {
    ApiCaller.postData('/api/permission', {
      'name': this.refs.permission_name.value
    }, (result, error) => {
      if(result.status == 200) {
        this.getPermission();
        this.refs.new.close();
      }
    })
  }

  openDelete = (permissionId) => {
    this.setState({permissionId});
    this.refs.delete.open();
  }

  deletePermission = () => {
    ApiCaller.deleteData(`/api/permission/${this.state.permissionId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getPermission();
        this.refs.delete.close();
      }
    })
  }

  componentDidMount() {
    this.getPermission();
  }

  render() {
    let fields = [
     {label: '权限名', name: 'name'},
     {label: '操作', compute: item => <button className="btn btn-primary" onClick={() => this.openDelete(item.id)}>删除</button>}
    ];

    return (
      <div id="permission">
        <h1>权限</h1>
        <Link onClick={() => this.refs.new.open()} className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.permissions} />
        <Dialog ref="new">
          <DialogHeader> 新增权限 </DialogHeader>
          <DialogBody>
            <label>权限名: <input ref="permission_name" type="text" /></label>
          </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.newPermission}>确定</button>
            <button className="btn btn-default" onClick={() => this.refs.new.close()}>取消</button>
          </DialogFooter>
        </Dialog>

        <Dialog ref="delete">
          <DialogHeader> 删除权限 </DialogHeader>
          <DialogBody> 确认删除 </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.deletePermission}>删除</button>
            <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
