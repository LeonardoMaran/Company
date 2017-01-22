import React, {Component} from 'react';
import Role from '../pages/Role';
import Login from '../sections/Login';
import Instant from '../sections/Instant';
import ApiCaller from '../lib/ApiCaller';

export default class Home extends Component {
  state = {user_number: -1, role_number: -1};

  componentDidMount() {
    ApiCaller.loadData(`/api/role`, {}, (result, error) => {
      if(result.status == 200) {
        this.setState({role_number: result.body.total});
      }
    });

    ApiCaller.loadData('/api/user', {}, (result, error) => {
      if(result.status == 200) {
        this.setState({user_number: result.body.total});
      }
    });
  }

  render() {
    switch (this.state.role_number) {
      case 0:
        return <Role />
      case -1:
        return <div></div>;
      default:
        switch(this.state.user_number) {
          case 0:
            return <Instant />
          case -1:
            return <div></div>;
          default:
            return <Login />;
        }
    }
  }
}
