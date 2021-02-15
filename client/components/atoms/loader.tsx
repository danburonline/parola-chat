import styles from "../../styles/Home.module.scss"

export default function Loader() {
  return (
    <div className={`${styles.message} ${styles.loading}`}>
      <img src="/svgs/loading-dots-icon.svg" alt="Loading indicator icon" className={styles.loadingDotsIcon} />
    </div>
  )
}