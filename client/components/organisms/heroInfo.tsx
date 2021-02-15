import styles from "../../styles/Home.module.scss"

import Button from "../atoms/button"

export default function HeroInfo() {
  return (
    <div className={styles.info}>
      <img src="/svgs/tablet_gruezi-headline.svg" alt="Tablet title: Grüezi, ich bin Parola" className={`${styles.infoHeader} ${styles.tablet}`} />
      <img src="/svgs/gruezi-headline.svg" alt="Desktop title: Grüezi, ich bin Parola" className={`${styles.infoHeader} ${styles.desktop}`} />
      <p className={styles.infoText}>Full-Stack-Werbe-Framework <br />zur Entwicklung von webseiten-übergreifender Chatbots.</p>
      <a href="https://github.com/danburonline/parola-chat" target="_blank" className={styles.link}>
      <Button/>
      </a>
    </div>
  )
}