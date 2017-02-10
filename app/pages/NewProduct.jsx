import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Tabs from '../components/Tabs';
import TextInput from '../components/TextInput';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';

export default class NewProduct extends Component {
  state = {message: '', product: {}};

  save  = () => {
    ApiCaller.postData(`/api/product`, {
      "name": this.refs.name.value,
    }, (result, error) => {
      if(result.status == 200) {
        browserHistory.push('/product/list');
      } else {
        this.setState({message: result.text});
      }
    })
  }

  componentDidMount() {
    let pathname = this.props.route.path;
    if(pathname.split('/')[1] == "edit") {
      ApiCaller.loadData(`/api/product/${this.props.params.id}`, {}, (result, error) => {
        if(result.status == 200) {
          this.setState({product: result.body});
        }
      });
    }
  }

  render() {
    //单击去定义新产品.
    //您必须为销售的所有内容定义产品，无论是实体产品，消耗品还是为客户提供的服务。
    //产品表单中的信息可以简化销售流程: 价格，询价单中的注释，会计信息，补货方式等等
    let product = this.state.product;
    return (
      <div id="new_product">
        <h1>产品 / 新建</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <p>产品名称</p>
        <h1><TextInput ref="name" value={product.name} placeholder="产品名称" /></h1>
        <p><input type="checkbox" />销售</p>
        <p><input type="checkbox" />采购</p>
        <img />
        <Tabs>
          <div title="通用信息">
            11
          </div>
          <div title="销售">
            22
          </div>
          <div title="备注">
            <h1>报价单说明</h1>
            <input />
            <h1>供应商说明</h1>
            <input />
          </div>
        </Tabs>
        <p className="error">{this.state.message}</p>
      </div>
    );
  }
}
