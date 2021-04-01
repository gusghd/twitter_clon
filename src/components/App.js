import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from 'fbase';
import {setUserInfo} from 'store';
import {connect} from 'react-redux';


function App({setUser, userObj}) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if(user) {
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUser(null);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} /> : 'Loading...'}
    </>
  );
}

function mapStateToProps(state) {
  return {userObj: state.userObj};
}


function mapDispatchToProps(dispatch, ownProps) {
  return {
      setUser: (user) => dispatch(setUserInfo(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

