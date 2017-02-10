import React,{Component,PropTypes} from 'react';
import './WizardStepIndicator.sass';

export default class WizardStepIndicator extends Component{
  static propTypes = {
    steps: PropTypes.array,
    current: PropTypes.number
  }

  static defaultProps = {
    current: 0,
    theme: 'default'
  }

	render() {
    const {
      steps,
      current,
      theme,
      ...other
    } = this.props;

    return (
      <div {...other}>
        {steps.map((step,i) => <div key={i} className={`${theme}-step-title ${i != current ? "remaining" : ""}`}>{step}</div>)}
      </div>
    );
	}
}
