import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import { getMe } from '../util/user';

const PrivateRoute = ({ path, component }) => {
  const [me, setMe] = useState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const res = await getMe();
        setMe(res);
        setMounted(true);
      } catch (e) {
        console.log(e);
        setMounted(true);
      }
    };
    asyncFunc();
  });
  if (!mounted) {
    return <p>loading...</p>;
  }
  if (me) {
    return <Route path={path} exact component={component} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRoute;
