import React, {Component, PropTypes} from 'react';

export default class TextInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: ''
  };

  state = {value: this.props.value || this.props.defaultValue || ''};

  get value() {
    return this.state.value;
  }

  set value(v) {
    this.setState({value: v});
  }

  handleChange = (event) => {
    this.setState({value: event.target.value}, () => {
      this.props.onChange && this.props.onChange(this.value);
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.value) {
      this.setState({value: nextProps.value || ''});
    }
  }

  render() {
    const {
      value,
      onChange,
      ...other
    } = this.props;
    return (
      <input ref="input" type="text" value={this.state.value.toString()} onChange={this.handleChange} {...other} />
    );
  }
}
