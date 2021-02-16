import styles from "./chatMenu.module.scss"

export default function ChatMenu() {
  return (
    <nav className={styles.chatMenu}>
      <a href="https://google.com" target="_blank" className={styles.menuLink}>
        <h3 className={styles.menuText}>Datenschutzbestimmungen</h3>
      </a>
      <a href="https://google.com" target="_blank" className={styles.menuLink}>
        <h3 className={styles.menuText}>Wer steckt dahinter</h3>
      </a>
      <a href="https://google.com" target="_blank" className={styles.menuLink}>
        <h3 className={styles.menuText}>Feature-Übersicht</h3>
      </a>
      <a href="https://google.com" target="_blank" className={styles.menuLink}>
        <h3 className={styles.menuText}>Mehr Infos</h3>
      </a>
      <div className={styles.copyrightContainer}>
        <p className={styles.copyrightText}>© Mediakanzlei AG</p>
        <div className={styles.socialIconsContainer}>
          <a href="https://google.com" target="_blank" className={styles.socialIconLink}>
            <img src="/svgs/facebook-icon.svg" alt="Facebook icon" className={styles.socialIcon} />
          </a>
          <a href="https://google.com" target="_blank" className={styles.socialIconLink}>
            <img src="/svgs/instagram-icon.svg" alt="Instagram icon" className={styles.socialIcon} />
          </a>
          <a href="https://google.com" target="_blank" className={styles.socialIconLink}>
            <img src="/svgs/linkedin-icon.svg" alt="LinkedIn icon" className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </nav>
  )
}