import * as Yup from 'yup';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import LoginContent from '../components/signIn/loginContent';

import styles from '../styles/signUp/signUp.module.css';

import Error from '../components/util/error';
import SuccessMessage from '../components/util/successMessage';

let errMessage;
function ResetPassword() {
  // TODO set the error model
  const [showEmailSuccessMessage, setShowEmailSuccessMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const token = searchParams.get('token');

  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.,?/@"<>{[}!$%^*&']).{6,}$/;

  const validationSchema = Yup.object().shape({
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
    password: '',
    confirmPassword: '',
  };

  const onLoginErrorHandler = () => {
    console.log('error model removed');
  };

  const onFormSubmitHandler = async (inputData) => {
    const response = await fetch(
      'https://entertainment-app-tomisin.vercel.app/user/reset-password',
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      }
    );

    const data = await response.json();
    if (data.success) {
      setShowEmailSuccessMessage(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      errMessage = data.message;
      setShowError(true);
    }
  };

  return (
    <section className={styles['section--container']}>
      {showEmailSuccessMessage && (
        <SuccessMessage onAddMessage='Password reset successful' />
      )}
      {showError && <Error onAddMessage={errMessage} />}
      <LoginContent
        title='Password Reset'
        formBtnWord='Reset'
        onFormSubmit={onFormSubmitHandler}
        validationSchema={validationSchema}
        initialFormValues={initialFormValues}
        notRequestResetPasswordPage={true}
        displayConfirmPassword={true}
        redirectLink='/login'
        redirectWord='Login'
        centerLink={true}
      />
    </section>
  );
}

export default ResetPassword;
