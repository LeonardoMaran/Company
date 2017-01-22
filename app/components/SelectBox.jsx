import React, {Component, PropTypes} from 'react';
import './SelectBox.sass';

export default class SelectBox extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.array,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {values: this.props.value || [], show: false};

  clickingOption = false;

  get value() {
    return this.state.values;
  }

  toggle = () => {
    this.setState({show: !this.state.show});
  };

  close = () => {
    if (this.clickingOption) return;
    this.setState({show: false});
  };

  checkChange = (value) => {
    return (event) => {
      this.refs.inputBox.focus();
      this.clickingOption = false;
      if (event.target.checked) {
        this.state.values.push(value);
      } else {
        this.state.values.remove(value);
      }
      this.forceUpdate();
      this.refs.inputBox.value = this.state.values.join('，');
      this.props.onChange && this.props.onChange(this.value);
    };
  };

  optionMouseDown = () => {
    this.clickingOption = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.value) {
      this.setState({values: nextProps.value || []});
    }
  }

  render() {
    const {
      options,
      value,
      placeholder,
      defaultValue,
      onChange,
      ...other
    } = this.props;

    let values = this.state.values;

    let createOption = (option, i) => {
      let {label, value} = typeof(option) == 'string' ? {label: option, value: option} : option;
      let checked = values.indexOf(value) > -1;
      return <li key={i}><label onMouseDown={this.optionMouseDown}><input type="checkbox" checked={checked} onChange={this.checkChange(value)}/>{label}</label></li>;
    };

    const overlayProps = {
      show: this.state.show,
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.inputBox)
    };

    return (
      <div className="select-box" style={{width: this.props.width}}>

      </div>
    );
  }
}
