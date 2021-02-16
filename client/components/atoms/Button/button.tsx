import styles from "./button.module.scss"

export default function Button(props) {
  return (
    <a href="https://github.com/danburonline/parola-chat" target="_blank" className={styles.link}>
      <div className={styles.button}>
        <img src="/svgs/code-icon.svg" alt="Code icon" className={styles.buttonIcon} />
        <p className={styles.buttonText}>Fork Code</p>
      </div>
    </a>
  )
}