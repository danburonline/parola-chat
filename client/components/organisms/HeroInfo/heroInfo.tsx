import styles from "./heroInfo.module.scss"
import Button from "../../atoms/Button/button"

export default function HeroInfo() {
  return (
    <div className={styles.info}>
      <img width="280" height="92" src="/svgs/tablet_gruezi-headline.svg" alt="Tablet title: Grüezi, ich bin Parola" className={`${styles.infoHeader} ${styles.tablet}`} />
      <img width="280" height="81" src="/svgs/gruezi-headline.svg" alt="Desktop title: Grüezi, ich bin Parola" className={`${styles.infoHeader} ${styles.desktop}`} />
      <p className={styles.infoText}>Full-Stack-Werbe-Framework <br />zur Entwicklung von webseiten-übergreifender Chatbots.</p>
      <Button />
    </div>
  )
}