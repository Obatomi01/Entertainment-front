import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

import styles from '../styles/signUp/signUp.module.css';

import LoginContent from '../components/signIn/loginContent';
import Error from '../components/util/error';

function SignUp(props) {
  const navigate = useNavigate();
  const onFormSubmitHandler = (data) => {
    onSendFormData(data);
  };
  const [signupError, setSignupError] = useState(false);

  // Yup package
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.,?/@"<>{[}!$%^*&']).{6,}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    userName: Yup.string().required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        passwordRegExp,
        "Password must contain at least one special character (.,?/@<>{[}!$%^*&'), number and alphabet"
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
  };

  const onSendFormData = async (inputData) => {
    const response = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const data = await response.json();
    if (data.success) {
      // TODO i need to show a pop up that the signup was successful that will display for like 3seconds by a setTimeOut function
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', data.userName);
      props.onChangeUserStatus(true);
      navigate('/');
    } else {
      setSignupError(true);
    }
  };

  const onLoginErrorHandler = () => {
    setSignupError(false);
  };

  return (
    <section className={styles['section--container']}>
      {signupError && <Error onAddMessage='Email already exists' />}
      <LoginContent
        title='Sign Up'
        showOtherOptions={true}
        formBtnWord='Create an account'
        redirectQuestion='Already have an account?'
        redirectLink='/login'
        redirectWord='Login'
        onFormSubmit={onFormSubmitHandler}
        validationSchema={validationSchema}
        onLoginErrorHandler={onLoginErrorHandler}
        notRequestResetPasswordPage={true}
        initialFormValues={initialFormValues}
        notResetPasswordPage={true}
        displayConfirmPassword={true}
      />
    </section>
  );
}

export default SignUp;
