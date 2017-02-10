import React, {Component} from 'react';
import WizardStepIndicator from '../components/WizardStepIndicator';
import ApiCaller from '../lib/ApiCaller';
import '../styles/SaleOrder.sass';

export default class SaleBar extends Component {
  state = {currentStep: 0, message: '', state: '', steps: []};

  judgeStep = () => {
    let steps = [];
    switch(this.state.state) {
      case "已取消":
        steps = ['报价单', '销售订单', '已取消'];
        this.setState({steps, currentStep: steps.indexOf(this.state.state)});
        break;
      case "报价单":
      case "销售订单":
      default:
        steps = ['报价单', '销售订单'];
        this.setState({steps, currentStep: steps.indexOf(this.state.state)});
        break;
    }
  };

  changeState = (state) => {
    ApiCaller
    .updateDataItem(`sale`, this.props.orderId, "state", state)
    .then(() => {
      this.setState({state}, () => this.judgeStep());
    })
    .catch(err => this.setState({message: err.text}));
  };

  componentDidMount() {
    if(this.props.orderId != null) {
      ApiCaller.loadData(`/api/sale/${this.props.orderId}`, {}, (result, error) => {
        if(result.status == 200) {
          let state = result.body.state;
          this.setState({state}, () => this.judgeStep());
        }
      })
    } else {
    this.setState({state: "报价单"}, () => this.judgeStep());
    }
  }

  render() {
    let btn = null;
    switch(this.state.state) {
      case "报价单":
        btn = <button onClick={() => this.changeState("销售订单")} className="btn btn-default">确认销售</button>;
        break;
      case "销售订单":
        btn = <button onClick={() => this.changeState("已取消")} className="btn btn-default">取消</button>;
        break;
      case "已取消":
        btn = <button onClick={() => this.changeState("报价单")} className="btn btn-default">设为报价单</button>;
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
