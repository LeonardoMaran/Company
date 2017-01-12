import React, {Component, PropTypes} from 'react';
import './Dialog.sass';

export default class Dialog extends Component {
  state = {visible: false, animation: "Out"};

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onClose: PropTypes.func
  };

  static defaultProps = {
    width: 400,
    height: 240
  };

  open = (onClose) => {
    if (onClose === undefined) {
      this.setState({visible: true, animation: "In"});
    } else {
      this.setState({visible: true, animation: "In", onClose});
    }
  };

  close = () => {
    this.setState({visible: false, animation: "Out"}, () => {
      this.state.onClose && this.state.onClose();
    });
  }

  render() {
    const {
      children,
      onClose,
      width,
      height,
      header,
      footer,
      ...other
    } = this.props;

    const style = {
      width: width + "px",
      height: height + "px",
      WebkitAnimationDuration: "0.3s",
      animationDuration: "0.3s"
    };

    return (
      <div className="dialog" style={{display: this.state.visible ? 'block' : 'none'}}>
        <div className="dialog-mask" onClick={() => this.close()}></div>
        <div className={`dialog-wrap fade${this.state.animation}`} style={style}>
          <span onClick={() => this.close()} className="fa fa-close dialog-close"></span>
          {children}
        </div>
      </div>
    );
  }
}

export class  DialogHeader extends Component{
  render() {
    return (
      <header className="dialog-header">{this.props.children}</header>
    )
  }
}

export class  DialogBody extends Component{
  render() {
    return (
      <div className="dialog-body">{this.props.children}</div>
    )
  }
}

export class  DialogFooter extends Component{
  render() {
    return (
      <footer className="dialog-footer">{this.props.children}</footer>
    )
  }
}
