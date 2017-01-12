import React, {Component, PropTypes} from 'react';
import './Tabs.sass';

export default class Tabs extends Component {
  state = {currentIndex: 0};

  check_title_index = (index) => {
    return index == this.state.currentIndex ? "tab_title tab_title_active" : "tab_title";
  }

  check_item_index = (index) => {
    return index == this.state.currentIndex ? "tab_item_active" : "tab_item";
  }

	render() {
    const {
      className,
      style
    } = this.props;

    return (
      <div className={className} style={style}>
        <div className="Tab_title_wrap">{this.props.children.map((child, i) => <div key={i} className={this.check_title_index(i)} onClick={() => {this.setState({currentIndex : i})}}>{child.props.title}</div>)}</div>
        <div className="Tab_item_wrap">{this.props.children.map((child, i) => <div key={i} className={this.check_item_index(i)}>{child}</div>)}</div>
      </div>
    )
	}
}
