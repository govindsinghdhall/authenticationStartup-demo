import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';
// useNavigation
import MainNavigation from '../components/MainNavigation';
import React, {useEffect} from 'react';
import {getTokenDuration} from '../util/auth';

function RootLayout () {
  const token = useLoaderData ();
  const submit = useSubmit ();
  // const navigation = useNavigation();
  useEffect (
    () => {
      if (!token) {
        return;
      }

      if (token === 'EXPIRED') {
        submit (null, {action: '/logout', method: 'post'});
        return;
      }

      const tokenDuration = getTokenDuration ();
      console.log (tokenDuration);

      setTimeout (() => {
        submit (null, {action: '/logout', method: 'post'});
      }, tokenDuration);
      // 1 * 60 * 60 * 1000
    },
    [token, submit]
  );

  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
