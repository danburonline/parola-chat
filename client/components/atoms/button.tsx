import styles from "../../styles/Home.module.scss"

export default function Button() {
  return (
    <div className={styles.infoButton}>
      <img src="/svgs/code-icon.svg" alt="Code icon" className={styles.buttonIcon} />
      <p className={styles.buttonText}>Fork Code</p>
    </div>
  )
}