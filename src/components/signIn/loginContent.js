import { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from '../../styles/signUp/signUp.module.css';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as ShowPasswordBtn } from '../../assets/visibility-on.svg';
import { ReactComponent as HidePasswordBtn } from '../../assets/visibility-off.svg';
import { Link } from 'react-router-dom';

/**
 *
 * @param {*} props
 * @returns
 * @parent {login, signup}
 */
function LoginContent(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // function to handle form submission
  const onFormSubmitHandler = (values, { setSubmitting }) => {
    props.onFormSubmit(values);
    setSubmitting(false);
  };

  const onChangeShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onChangeShowConfirmPasswordHandler = (e) => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Fragment>
      <Logo className={styles.logo} />
      <div className={styles['sign-up__container']}>
        <h1>{props.title}</h1>
        <Formik
          initialValues={props.initialFormValues}
          validationSchema={props.validationSchema}
          onSubmit={onFormSubmitHandler}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                {props.notResetPasswordPage && (
                  <div>
                    <Field
                      name='email'
                      placeholder='Email'
                      id='email'
                      onFocus={props.onLoginErrorHandler}
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className={styles.error}
                    />
                  </div>
                )}

                {props.showOtherOptions && (
                  <div>
                    <Field
                      name='userName'
                      placeholder='Username'
                      id='email'
                      onFocus={props.onLoginErrorHandler}
                    />
                    <ErrorMessage
                      name='userName'
                      component='div'
                      className={styles.error}
                    />
                  </div>
                )}

                {props.notRequestResetPasswordPage && (
                  <div>
                    <div className={styles['password--container']}>
                      <Field
                        type={!showPassword ? 'password' : 'text'}
                        name='password'
                        placeholder='Password'
                        onFocus={props.onLoginErrorHandler}
                      />
                      <button
                        type='button'
                        className={styles['show--password__btns']}
                        onClick={onChangeShowPasswordHandler}
                      >
                        {!showPassword ? (
                          <ShowPasswordBtn
                            className={styles['show--password__btn']}
                          />
                        ) : (
                          <HidePasswordBtn
                            className={styles['show--password__btn']}
                          />
                        )}
                      </button>
                    </div>

                    <ErrorMessage name='password'>
                      {(errorMsg) => {
                        return (
                          <div className={styles.error}>
                            {errorMsg ===
                            'Password must be at least 6 characters'
                              ? 'Password must be at least 6 characters'
                              : errorMsg ===
                                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                              ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                              : errorMsg}
                          </div>
                        );
                      }}
                    </ErrorMessage>
                  </div>
                )}

                {props.displayConfirmPassword && (
                  <div>
                    <div className={styles['password--container']}>
                      <Field
                        type={!showConfirmPassword ? 'password' : 'text'}
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        onFocus={props.onLoginErrorHandler}
                      />
                      <button
                        type='button'
                        className={styles['show--password__btns']}
                        onClick={onChangeShowConfirmPasswordHandler}
                      >
                        {!showConfirmPassword ? (
                          <ShowPasswordBtn
                            className={styles['show--password__btn']}
                          />
                        ) : (
                          <HidePasswordBtn
                            className={styles['show--password__btn']}
                          />
                        )}
                      </button>
                    </div>
                    <ErrorMessage name='confirmPassword'>
                      {(errorMsg) => {
                        return (
                          <div className={styles.error}>
                            {errorMsg === 'Passwords must match'
                              ? 'Passwords must match'
                              : errorMsg}
                          </div>
                        );
                      }}
                    </ErrorMessage>
                  </div>
                )}
                <button
                  type='submit'
                  className={styles['sign-up__btn']}
                  onSubmit={onFormSubmitHandler}
                  disabled={isSubmitting}
                >
                  {props.formBtnWord}
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className={styles['redirect--container']}>
          {!props.centerLink && <h3>{props.redirectQuestion}</h3>}
          <Link
            to={props.redirectLink}
            className={`${styles.link} ${
              props.centerLink ? styles['center--link'] : ''
            }`}
          >
            {props.redirectWord}
          </Link>
        </div>

        {props.forgotPassword && (
          <Link
            className={`${styles.link} ${styles['forgot--password']}`}
            to={'/request-reset-password'}
          >
            Forgot your password?
          </Link>
        )}
      </div>
    </Fragment>
  );
}

export default LoginContent;
