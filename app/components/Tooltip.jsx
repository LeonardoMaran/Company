import React, {Component} from 'react';
import './Tooltip.sass';

export default class Tooltip extends Component {
  render() {
    const {
      placement,
      className,
      style,
      children,
      ...props
    } = this.props;

    return (
      <div className={`tooltip tooltip-${placement}`} style={style}>
        <div className="tooltip-arrow" />
        <div className="tooltip-inner">
          {children}
        </div>
      </div>
    );
  }
}
