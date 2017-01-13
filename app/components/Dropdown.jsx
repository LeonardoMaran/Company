import React, {Component} from 'react';
import './Dropdown.sass';

export default class Dropdown extends Component {
  render() {
    const {
      title,
      children,
      className,
      ...others
    } = this.props;

    return (
      <div className={"dropdown "+className} {...others}>
        <div className="dropdown-title">{title}</div>
        <div className="dropdown-menu">{children}</div>
      </div>
    );
  }
}
