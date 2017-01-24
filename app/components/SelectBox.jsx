import React, {Component, PropTypes} from 'react';
import './SelectBox.sass';

export default class SelectBox extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    firstSelected: PropTypes.bool
  };

  state = {value: this.props.value || this.props.defaultValue, option: {}, show: false};

  get value() {
    return this.state.value;
  }

  close = (option) => {
    if(option) {
      this.setState({option});
    }
    this.setState({show: false});
  }

  toggle = () => {
    this.setState({show: !this.state.show});
  }

  render() {
    const {
      width,
      options,
      value,
      defaultValue,
      onChange,
      firstSelected,
      children,
      ...other
    } = this.props;

    let createOption = (option, i) => {
      let {label, value, disabled} = typeof(option) == 'string' ? {label: option, value: option} : option;
      return <li key={i} onClick={() => this.close(option)}>{label}</li>
    };

    return (
      <div className="select-box" style={{width: width}}>
        <li className="title" onClick={this.toggle}><label>{this.state.option.label}</label></li>
        {
          this.state.show
          ? <ul>
              {options.map(createOption)}
              {children}
            </ul>
          : null
        }
      </div>
    );
  }
}
