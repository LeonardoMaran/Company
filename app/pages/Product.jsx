import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Product.sass';

export default class Product extends Component {
  state = {products: [], message: '', productId: null, status: "loading"};

  getProduct = () => {
    ApiCaller.loadData(`/api/product`, {}, (result, error) => {
      if(result.status == 200) {
        let products = result.body.item;
        this.setState({products, status: products.isEmpty() ? "empty" : "nonempty"});
      } else {
        this.setState({message: result.text});
      }
    });
  }

  openDelete = (productId) => {
    this.setState({productId});
    this.refs.delete.open();
  };

  deleteProduct = () => {
    ApiCaller.deleteData(`/api/product/${this.state.productId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getProduct();
        this.refs.delete.close();
      } else {
        this.setState({message: '要删除产品，你必须先取消它'});
      }
    })
  };

  componentDidMount() {
    this.getProduct();
  }

  render() {
    let fields = [];
    let pathname = this.props.location.pathname.split('/')[1];
    switch(pathname) {
      case 'product':
      case 'purchase':
      case 'sales':
        fields = [
         {label: '内部参考', name: 'id'},
         {label: '名字', name: 'name'},
         {label: '标价', name: 'status'},
         {label: '成本', name: 'status'},
         {label: '内部类别', name: 'status'},
         {label: '产品类型', name: 'status'},
         {label: '在手数量', name: 'status'},
         {label: '预测数量', name: 'status'},
         {label: '操作', compute: item =>
           <div>
             <Link style={{margin: '5px'}} to={`/${pathname}/product/${item.id}`} className="btn btn-default">查看详情</Link>
             <button onClick={() => this.openDelete(item.id)} className="btn btn-primary">删除</button>
           </div>
         }
        ];
        break;
    }

    return (
      <div id="product">
        <h1>产品</h1>
        <Link to={`/${pathname}/product/new`} className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.products} />

        <Dialog ref="delete">
          <DialogHeader> 删除产品 </DialogHeader>
          <DialogBody> 确认删除 </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.deleteProduct}>删除</button>
            <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
