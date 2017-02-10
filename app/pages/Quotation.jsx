import React, {Component} from 'react';
import {Link} from 'react-router';
import {formatDate} from '../lib';
import DataTable from '../components/DataTable';
import Dialog, {DialogHeader, DialogBody, DialogFooter} from '../components/Dialog';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';

export default class Quotation extends Component {
  state = {quotation: [], quotationId: null};

  getQuotation = () => {
    let account = Session.current();
    ApiCaller.loadData('/api/sale', {
      query: {"write_account": account.username}
    }, (result, error) => {
      if(result.status == 200) {
        this.setState({quotation: result.body.item});
      }
    });
  };

  openDelete = (quotationId) => {
    this.setState({quotationId});
    this.refs.delete.open();
  };

  deleteQuotation = () => {
    ApiCaller.deleteData(`/api/sale/${this.state.quotationId}`, {}, (result, error) => {
      if(result.status == 200) {
        this.getQuotation();
        this.refs.delete.close();
      } else {
        this.setState({message: '您不能删除已发送的报价或销售订单！尝试在之前取消.'});
      }
    })
  };

  componentDidMount() {
    this.getQuotation();
  }

  render() {
    let fields = [
     {label: '报价单号码', name: 'id'},
     {label: '单据日期', compute: item => formatDate(item.create_date)},
     {label: '客户', compute: item => item.customer ? item.customer.name : null},
     {label: '销售员', compute: item => item.saler ? item.saler.username : null},
     {label: '总计', name: 'amount_total'},
     {label: '状态', name: 'state'},
     {label: '操作', compute: item => <div>
       <Link style={{margin: '5px'}} to={`/sales/quotation/${item.id}`} className="btn btn-default">查看详情</Link>
       <button onClick={() => this.openDelete(item.id)} className="btn btn-primary">删除</button>
     </div>}
    ];
    return (
      <div id="quotation">
        <h1>报价单</h1>
        <Link to="/sales/quotation/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={this.state.quotation} />

        <Dialog ref="delete">
          <DialogHeader> 删除报价单 </DialogHeader>
          <DialogBody> 确认删除 </DialogBody>
          <DialogFooter>
            <button className="btn btn-primary" onClick={this.deleteQuotation}>删除</button>
            <button className="btn btn-default" onClick={() => this.refs.delete.close()}>取消</button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
