import React, { Component } from 'react';
import './Login.scss';
import logo from '../../assets/logo.svg';
import {
  DRIVER_ROLE,
  FRANCHISE_MANAGER_ROLE
} from '../../helpers/userData';
import { loginUser } from '../../store/Login/login.actions';
import { connect } from 'react-redux';
import { State } from '../../store';

interface LoginState {
  selectedRole: string;
}

class Login extends Component<any, LoginState> {
  readonly state: LoginState = {
    selectedRole: ''
  };

  selectRole = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    this.setState({
      selectedRole: e.target.id
    });
  };

  handleLogin = async () => {
    await this.props.loginUser(this.state.selectedRole);
    this.props.user.role === 'DRIVER_ROLE'
      ? this.props.history.push('/DriverDashboard')
      : this.props.history.push('/Dashboard');
  };

  render() {
    const { selectedRole } = this.state;
    return (
      <div className={'grid login'}>
        <div className={'grid__row'}>
          <div className={'grid__column-4 grid__column-m-4'}>
            <div className={'login__wrapper'}>
              <img src={logo} alt="logo" className={'login__logo'} />
              <div className={'login__content'}>
                <div className={'login__welcome'}>
                  <h2>Welcome back</h2>
                  <div className={'login__instructions'}>Select a role below and login to continue</div>
                </div>
                <div className={'user-options'}>

                  <div
                    className={
                      'user-options__role' +
                      (selectedRole === FRANCHISE_MANAGER_ROLE
                        ? ' user-options__role--active'
                        : '')
                    }
                    id={FRANCHISE_MANAGER_ROLE}
                    onClick={this.selectRole}
                  >
                    Manager
                  </div>
                  <div
                    className={
                      'user-options__role user-options__role--last' +
                      (selectedRole === DRIVER_ROLE
                        ? ' user-options__role--active'
                        : '')
                    }
                    id={DRIVER_ROLE}
                    onClick={this.selectRole}
                  >
                    Driver
                  </div>
                </div>
                <button
                  className={'login__button btn--primary'}
                  disabled={!selectedRole}
                  onClick={this.handleLogin}
                >
                  Login
                </button>
                <div
                 className={'login__purpose'}
                >
                 *  This application is designed for demonstration purposes.
                </div>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: State) => state.login,
  { loginUser }
)(Login);
