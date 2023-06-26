import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  // проверка авторизации
  const { isAuth, isLoading } = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {isAuth ? (
        <>
          {privateRoutes.map(route => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
          <Route path="/*" element={<Navigate to="/posts" />} />
        </>
      ) : (
        <>
          {publicRoutes.map(route => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
