import React, {Component} from 'react';
import {Link} from 'react-router';
import ApiCaller from '../lib/ApiCaller';

export default class User extends Component {
  state = {user: {}};

  componentDidMount() {
    ApiCaller.loadData(`/api/user/${this.props.params.id}`, {}, (result, error) => {
      this.setState({user: result.body});
    });
  }

  render() {
    let user = this.state.user;
    return (
      <div>
        用户
        {user.username}
      </div>
    );
  }
}
