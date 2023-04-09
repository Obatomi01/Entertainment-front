import React from 'react';

const ctx = {
  token: '',
  isAuth: false,
  userName: '',
  curFilterYear: '',
  curFilterRating: '',
};

export const MyContext = React.createContext();

function CtxProvider(props) {
  return <MyContext.Provider value={ctx}>{props.children}</MyContext.Provider>;
}

export default CtxProvider;
