import React from 'react';
import Header from '../components/Header/Header.jsx'
import LoginForm from '../components/LoginForm/LoginForm'

function LoginPage() {
  return (
    <div className="LoginPage">
      <Header header="Login"/>
      <LoginForm/>
    </div>
  );
}

export default LoginPage;
