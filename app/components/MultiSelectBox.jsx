import React, {Component, PropTypes} from 'react';
import './MultiSelectBox.sass';

export default class MultiSelectBox extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    firstSelected: PropTypes.bool
  };

  state = {values: this.props.value || [], labels: this.props.labels || [], show: false};

  get value() {
    return this.state.values;
  }

  toggle = () => {
    this.setState({show: !this.state.show});
  };

  close = () => {
    this.setState({show: false});
  };

  checkChange = (option) => {
    return (event) => {
      let value = option.value;
      let label = option.label;
      if (event.target.checked) {
        this.state.labels.push(label);
        this.state.values.push(value);
      } else {
        this.state.labels.remove(label);
        this.state.values.remove(value);
      }
      this.forceUpdate();
      this.props.onChange && this.props.onChange(this.value);
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.value) {
      this.setState({values: nextProps.value || []});
    }
  }

  render() {
    const {
      options,
      value,
      defaultValue,
      onChange,
      title,
      ...other
    } = this.props;

    let values = this.state.values;

    let createOption = (option, i) => {
      let {label, value} = typeof(option) == 'string' ? {label: option, value: option} : option;
      let checked = values.indexOf(value) > -1;
      return <li key={i}><label><input type="checkbox" checked={checked} onChange={this.checkChange(option)}/>{label}</label></li>;
    };

    return (
      <div className="multi-select-box" style={{width: this.props.width}}>
        <li className="title" onClick={this.toggle}><label>{this.state.labels.isEmpty() ? title : this.state.labels.join('，')}</label></li>
        {
          this.state.show
          ? <ul>
              {options.map(createOption)}
              <button className="btn btn-primary" onClick={this.close}>确定</button>
            </ul>
          : null
        }
      </div>
    );
  }
}
