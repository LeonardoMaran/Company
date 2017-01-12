import React, {Component} from 'react';

export default class ShowPassword extends Component {
	render() {
		const {
			show,
			onClick,
			...others
		} = this.props;

		return (
			<span {...others} onClick={onClick}>{show ? <strong>Hide</strong> : <strong>Show</strong>}</span>
		);
	}
}
