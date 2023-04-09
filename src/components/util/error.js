import styles from '../../styles/signUp/signUp.module.css';

function Error(props) {
  return (
    <div className={styles['error--container']}>
      <h2>{props.onAddMessage}</h2>
    </div>
  );
}

export default Error;
