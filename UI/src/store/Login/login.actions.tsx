import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { User, userData } from '../../helpers/userData';
import { jasperServerUrl } from '../../helpers/constants';
import { Dispatch } from 'redux';
import { SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT, SET_USER_FRANCHISES, SET_USER_REGIONS } from './login.types';
import { history } from '../../configureStore';

// === Thunk action creators === //
/**
 * Fetch user info and add to local storage and redux store.
 * @param role
 */
export const loginUser = (role: String) => {
  return async (dispatch: Dispatch) => {
    try {
      // Instead of a service, we're grabbing the user and token from a local file
      let user: User = userData.find(user => user.role === role) as User;

      // Store user to resume after refresh
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(user));

      // Login user to global Visualize JS instance ()
      await visualizeHelper.login(user.token, jasperServerUrl);
      // await visualizeHelper.getInputControl('', '/public/Bikeshare_demo/Reports/Lookups')
      //   .then((data: any) => {
      //     //TODO: Setup for franchises only. Assumes single franchise is returned.
      //     dispatch(setUserFranchises(data[0].state.options));
      //     dispatch(setUserRegions(data[1].state.options));
      //   });

      dispatch(setUserLoggedIn(user));
    } catch (error) {
      console.log('There was an error when logging in', error);
    }
  };
};

/**
 * Log user out of visualize.js, clear user info
 */
export const logOutUser = () => {
  return async (dispatch: Dispatch) => {
    await visualizeHelper.logOut();
    dispatch(setUserLoggedOut());
    localStorage.clear();
    history.push('/');
  };
};

// === Redux Actions === //

export const setUserLoggedIn = (user: User) => {
  return {
    type: SET_USER_LOGGED_IN,
    user: user
  };
};

export const setUserRegions = (regions: any[]) => {
  return {
    type: SET_USER_REGIONS,
    regions
  }
};

export const setUserFranchises = (franchises: any[]) => {
  return {
    type: SET_USER_FRANCHISES,
    franchises
  }
};

export const setUserLoggedOut = () => {
  return {
    type: SET_USER_LOGGED_OUT
  };
};
