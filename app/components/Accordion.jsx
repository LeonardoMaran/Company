import React, {Component} from 'react';
import {Link} from 'react-router';
import './Accordion.sass';

export default class Accordion extends Component {
  render() {
    return (
      <div className="accordion">
        <ul>{this.props.children}</ul>
      </div>
    );
  }
}

export class AccordionElement extends Component {
  state = { expanded: false }

  handleClickTitle = () => {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    return (
      <li>
        <h3 onClick={this.handleClickTitle} className="accordion accordion-title">{this.props.title}</h3>
      	<ul className={this.state.expanded ? "accordion accordion-content active" : "accordion accordion-content"}>{this.props.children}</ul>
      </li>
    )
  }
}

export class AccordionItem extends Component {
  render() {
    return (
      <li><Link to={this.props.to}>{this.props.children}</Link></li>
    );
  }
}
