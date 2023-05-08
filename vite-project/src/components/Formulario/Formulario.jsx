import styles from "./Formulario.module.css";

const Formulario = () => {
  return (
    <form className={styles.form}>
      <div className={styles.header}>Sign In</div>
      <div className={styles.inputs}>
        <input placeholder="Email" className={styles.input} type="text" />
        <input
          placeholder="Password"
          className={styles.input}
          type="password"
        />
        <div className={styles.container}>
          {/* <label className={styles.checkbox}></label> */}
          <label for="checkbox" className={styles.text}>
            <input type="checkbox" id="checkbox" />
            Remember me
          </label>
        </div>
        <button className={styles.btn}>Submit</button>
        <a className={styles.forget} href="#">
          Forget password ?
        </a>
        <p className={styles.link}>
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </form>
  );
};
export default Formulario;
