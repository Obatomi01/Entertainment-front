import { useState } from 'react';

import * as Yup from 'yup';

import LoginContent from '../components/signIn/loginContent';
import Error from '../components/util/error';

import styles from '../styles/signUp/signUp.module.css';
import SuccessMessage from '../components/util/successMessage';

import { ReactComponent as Spinner } from '../assets/loading-spinner.svg';

let errMessage;
function ForgotPassword() {
  const [showError, setShowError] = useState(false);
  const [showEmailSuccessMessage, setShowEmailSuccessMessage] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const onLoginErrorHandler = () => {
    setShowError(false);
  };

  const initialFormValues = { email: '' };

  const onFormSubmitHandler = async (inputData) => {
    setShowError(false);
    setShowSpinner(true);
    const response = await fetch(
      'https://entertainment-app.onrender.com/user/request-password-reset',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      }
    );
    const data = await response.json();
    setShowSpinner(false);
    if (data.success) {
      setShowEmailSuccessMessage(true);
      setTimeout(() => {
        setShowEmailSuccessMessage(false);
      }, 10000);
    } else {
      errMessage = data.message;
      setShowError(true);
    }
  };

  return (
    <section className={styles['section--container']}>
      {showEmailSuccessMessage && (
        <SuccessMessage onAddMessage='Email sent successfully' />
      )}
      {showError && <Error onAddMessage={errMessage} />}
      {showSpinner && <Spinner className='spinner' />}
      <LoginContent
        title='Reset Password'
        showOtherOptions={false}
        formBtnWord='Send Code'
        onFormSubmit={onFormSubmitHandler}
        validationSchema={validationSchema}
        onLoginErrorHandler={onLoginErrorHandler}
        initialFormValues={initialFormValues}
        notResetPasswordPage={true}
      />
    </section>
  );
}

export default ForgotPassword;
