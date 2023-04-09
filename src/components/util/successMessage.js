import styles from '../../styles/signUp/signUp.module.css';

/**
 *
 * @param {*} props
 * @returns
 * @parent forgotPassword, resetPassword
 */
function SuccessMessage(props) {
  return (
    <div className={styles['success--container']}>
      <h2>{props.onAddMessage}</h2>
    </div>
  );
}

export default SuccessMessage;
