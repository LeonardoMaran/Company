import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import MultiSelectBox from '../components/MultiSelectBox';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import ApiCaller from '../lib/ApiCaller';

export default class Role extends Component {
  state = {roles: [], roleId: null, permissions: [], selected_permissions: []};

  getRole = () => {
    ApiCaller.loadData('/api/role', {}, (result, error) => {
      if(result.status == 200) {
        this.setState({roles: result.body.item});
      }
    });
  }

  newRole = () => {
    ApiCaller.postData('/api/role', {
      'name': this.refs.rolename.value,
      'permission': this.refs.permission.value
    }, (result, error) => {
      if(result.status == 200) {
        this.getRole();
        this.refs.new.close();
      }
    })
  }

  openDelete = (roleId) => {
    this.setState({roleId});
    this.refs.delete.open();
  }

  deleteRole = () => {
    ApiCaller.deleteData(`/api/role/${this.state.roleId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getRole();
        this.refs.delete.close();
      }
    })
  }

  selectPermission = (value) => {
    this.setState({selected_permissions: value});
  }

  componentDidMount() {
    this.getRole();
    ApiCaller.loadData('/api/permission', {}, (result, error) => {
      if(result.status == 200) {
        this.setState({permissions: result.body.item});
      }
    });
  }

  render() {
    let fields = [
     {label: '角色名', name: 'name'},
     {label: '权限', compute: item => item.permission.join("，")},
     {label: '操作', compute: item => <button className="btn btn-primary" onClick={() => this.openDelete(item.id)}>删除</button>}
    ];

    return (
      <div id="role">
        <h1>角色</h1>
        <Link onClick={() => this.refs.new.open()} className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.roles} />
        <Dialog ref="new">
          <DialogHeader> 新增角色 </DialogHeader>
          <DialogBody>
            <p><label>角色名: <input ref="rolename" type="text" className="border-bottom-input" style={{width: '280px'}} /></label></p>
            <div>
              <label>权限名:</label>
              <MultiSelectBox ref="permission" width={280} value={this.state.selected_permissions} onChange={this.selectPermission} title={"请选择"} options={this.state.permissions.map(role => {return {item: role, value: role.id, label: role.name}})} />
            </div>
          </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.newRole}>确定</button>
            <button className="btn btn-default" onClick={() => this.refs.new.close()}>取消</button>
          </DialogFooter>
        </Dialog>

        <Dialog ref="delete">
          <DialogHeader> 删除角色 </DialogHeader>
          <DialogBody> 确认删除 </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.deleteRole}>删除</button>
            <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
