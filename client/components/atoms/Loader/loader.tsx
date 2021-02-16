import styles from "./loader.module.scss"

export default function Loader() {
  return (
    <div className={styles.loader}>
      <img src="/svgs/loading-dots-icon.svg" alt="Loading indicator icon" className={styles.loaderDotsIcon} />
    </div>
  )
}