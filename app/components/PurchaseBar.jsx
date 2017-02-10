import React, {Component} from 'react';
import WizardStepIndicator from '../components/WizardStepIndicator';
import ApiCaller from '../lib/ApiCaller';
import '../styles/SaleOrder.sass';

export default class PurchaseBar extends Component {
  state = {currentStep: 0, message: '', state: '', steps: []};

  judgeStep = () => {
    let steps = [];
    switch(this.state.state) {
      case "已取消":
        steps = ['询价单', '采购订单', '已取消'];
        this.setState({steps, currentStep: steps.indexOf(this.state.state)});
        break;
      case "询价单":
      case "采购订单":
      default:
        steps = ['询价单', '采购订单'];
        this.setState({steps, currentStep: steps.indexOf(this.state.state)});
        break;
    }
  };

  changeState = (state) => {
    ApiCaller
    .updateDataItem(`purchase`, this.props.orderId, "state", state)
    .then(() => {
      this.setState({state}, () => this.judgeStep());
    })
    .catch(err => this.setState({message: err.text}));
  };

  componentDidMount() {
    if(this.props.orderId != null) {
      ApiCaller.loadData(`/api/purchase/${this.props.orderId}`, {}, (result, error) => {
        if(result.status == 200) {
          let state = result.body.state;
          this.setState({state}, () => this.judgeStep());
        }
      })
    } else {
    this.setState({state: "询价单"}, () => this.judgeStep());
    }
  }

  render() {
    let btn = null;
    switch(this.state.state) {
      case "询价单":
        btn = <button onClick={() => this.changeState("采购订单")} className="btn btn-default">确认订单</button>;
        break;
      case "采购订单":
        btn = <button onClick={() => this.changeState("已取消")} className="btn btn-default">取消</button>;
        break;
      case "已取消":
        btn = <button onClick={() => this.changeState("询价单")} className="btn btn-default">设为询价单</button>;
        break;
      default:
        btn = null;
        break;
    }

    return (
      <div className="change_bar">
        <div>{btn}</div>
        <div>
          <WizardStepIndicator style={{display: 'inline-block'}} steps={this.state.steps} current={this.state.currentStep} />
        </div>
      </div>
    );
  }
}
