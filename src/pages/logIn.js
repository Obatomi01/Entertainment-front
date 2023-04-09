import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/signUp/signUp.module.css';

import { MyContext } from '../components/util/ctx';
import LoginContent from '../components/signIn/loginContent';
import Error from '../components/util/error';

/**
 *
 * @param {*} props
 * @parent App
 * @returns
 */
function Login(props) {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);
  // Yup package
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.,?/@"<>{[}!$%^*&']).{6,}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        passwordRegExp,
        "Password must contain at least one special character (.,?/@<>{[}!$%^*&'), number and alphabet"
      )
      .required('Password is required'),
  });

  const initialFormValues = { email: '', password: '' };

  const onFormSubmitHandler = (data) => {
    onSendFormData(data);
  };

  const onSendFormData = async (inputData) => {
    const response = await fetch(
      'https://entertainment-app.onrender.com/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      }
    );
    const data = await response.json();
    ctx.token = data.token;
    if (data.success) {
      const limit = {
        limitHomePage: 9,
        limitMoviesPage: 4,
        limitTVSeries: 4,
      };

      ctx.isAuth = true;
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', data.userName);
      localStorage.setItem('pageLimit', JSON.stringify(limit));
      props.onChangeUserStatus(ctx.isAuth);
      navigate('/');
    } else {
      setLoginError(true);
    }
  };

  const onLoginErrorHandler = () => {
    setLoginError(false);
  };

  return (
    <section className={styles['section--container']}>
      {loginError && <Error onAddMessage='Incorrect email or password!!' />}
      <LoginContent
        title='Log in'
        showOtherOptions={false}
        formBtnWord='Login to your account'
        redirectQuestion="Don't have an account?"
        redirectLink='/signup'
        redirectWord='Sign Up'
        onFormSubmit={onFormSubmitHandler}
        validationSchema={validationSchema}
        onLoginErrorHandler={onLoginErrorHandler}
        forgotPassword={true}
        notRequestResetPasswordPage={true}
        initialFormValues={initialFormValues}
        notResetPasswordPage={true}
      />
    </section>
  );
}

export default Login;
