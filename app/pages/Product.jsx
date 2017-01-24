import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Product.sass';

export default class Product extends Component {
  state = {products: [], message: ''};

  componentDidMount() {
    ApiCaller.loadData(`/api/product`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({products: result.body.item});
      } else {
        this.setState({message: result.text});
      }
    })
  }

  render() {
    let fields = [];
    console.log(this.props.location.pathname.split('/')[1]);
    switch(this.props.location.pathname.split('/')[1]) {
      case 'product':
      case 'purchase':
        fields = [
         {label: '内部参考', name: 'status'},
         {label: '名字', name: 'name'},
         {label: '标价', name: 'status'},
         {label: '成本', name: 'status'},
         {label: '内部类别', name: 'status'},
         {label: '产品类型', name: 'status'},
         {label: '在手数量', name: 'status'},
         {label: '预测数量', name: 'status'}
        ];
        break;
      case 'sales':
        fields = [
         {label: '内部参考', name: 'status'},
         {label: '名字', name: 'name'},
         {label: '标价', name: 'status'},
         {label: '成本', name: 'status'},
         {label: '内部类别', name: 'status'},
         {label: '产品类型', name: 'status'}
        ];
        break;
    }

    return (
      <div id="product">
        <h1>产品</h1>
        <Link to="/sales/product/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.products} />
      </div>
    );
  }
}
