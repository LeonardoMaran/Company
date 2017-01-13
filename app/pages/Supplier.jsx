import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import ApiCaller from '../lib/ApiCaller';

export default class Supplier extends Component {
  state = {suppliers: [], supplierId: null};

  getSupplier = () => {
    ApiCaller.loadData('/api/contact', {
      query: {"supplier": true},
    }, (result, error) => {
      if(result.status == 200) {
        this.setState({suppliers: result.body.item});        
      }
    });
  }

  openDelete = (supplierId) => {
    this.setState({supplierId});
    this.refs.delete.open();
  }

  deleteSupplier = () => {
    ApiCaller.deleteData(`/api/contact/${this.state.supplierId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getSupplier();
        this.refs.delete.close();
      }
    });
  }

  componentDidMount() {
    this.getSupplier();
  }

  render() {
    let fields = [
     {label: '名字', name: 'name'},
     {label: '电话', name: 'phone'},
     {label: 'Email', name: 'email'},
     {label: '操作', compute: item => <div>
        <Link to="" className="btn btn-default" style={{margin: '5px'}}>查看详情</Link>
        <button className="btn btn-primary" onClick={() => this.openDelete(item.id)}>删除</button>
      </div>
     }
    ];
    return (
      <div id="supplier">
        <h1>供应商</h1>
        <Link to="/purchase/supplier/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.suppliers} />

      <Dialog ref="delete">
        <DialogHeader>删除供应商</DialogHeader>
        <DialogBody>确定删除!</DialogBody>
        <DialogFooter>
          <button className="btn btn-primary" onClick={this.deleteSupplier}>删除</button>
          <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
        </DialogFooter>
      </Dialog>
      </div>
    );
  }
}
