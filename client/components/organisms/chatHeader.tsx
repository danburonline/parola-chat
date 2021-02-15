import { useState } from "react"
import styles from "../../styles/Home.module.scss"

import ChatMenu from "../molecules/chatMenu"

export default function ChatHeader(props) {
  const [menuState, setMenuState] = useState(false)

  const menuStateHandler = () => {
    setMenuState(prevState => !prevState)
  }

  return <>
    <div className={
      props.isActive ? `${styles.chatHeader} ${styles.active}` : `${styles.chatHeader}`
    }>
      <img src="/svgs/illustration.svg" alt="Parola illustration" className={
        props.isActive ? `${styles.illustration} ${styles.active}` : `${styles.illustration}`
      } />
      <img src="/svgs/headline.svg" alt="Ich bin keine Werbung" className={
        props.isActive ? `${styles.headline} ${styles.active}` : `${styles.headline}`
      } />
      {props.isActive ? (
        <>
          <h2 className={styles.chatHeading}>Parola</h2>
          {menuState ? (
            <>
              <img src="/svgs/close-icon.svg" onClick={menuStateHandler} alt="Close menu" className={styles.menuCloseButton} />
              <ChatMenu />
            </>
          ) : (<img src="/svgs/meatballs-icon.svg" onClick={menuStateHandler} alt="Navigation" className={styles.menuOpenButton} />)}
        </>
      ) : null}
    </div>
  </>
}