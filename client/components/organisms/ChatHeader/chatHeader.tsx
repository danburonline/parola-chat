import { useState } from "react"
import styles from "./chatHeader.module.scss"
import ChatMenu from "../../molecules/ChatMenu/chatMenu"
import { motion } from 'framer-motion'

const variants = {
  active: {
    height: 60
  },
  inactive: {
    height: 300
  }
}

export default function ChatHeader(props) {
  const [menuState, setMenuState] = useState(false)

  const menuStateHandler = () => {
    setMenuState(prevState => !prevState)
  }

  return <>
    <motion.div variants={variants}
      animate={props.isActive ? "active" : "inactive"}
      className={props.isActive ? `${styles.chatHeader} ${styles.active}` : `${styles.chatHeader}`
      }>
      {props.isActive ? (
        <>
          <motion.img width="30" height="30" key={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src="/svgs/illustration.svg" alt="Parola illustration" className={`${styles.illustration} ${styles.active}`} />
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.chatHeading}>Parola</motion.h2>
          {menuState ? (
            <>
              <img width="25" height="25" src="/svgs/close-icon.svg" onClick={menuStateHandler} alt="Close menu" className={styles.menuCloseButton} />
              <ChatMenu />
            </>
          ) : (<img width="15" height="30" src="/svgs/meatballs-icon.svg" onClick={menuStateHandler} alt="Navigation" className={styles.menuOpenButton} />)}
        </>
      ) : (
          <>
            <motion.img width="135" height="135" key={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src="/svgs/illustration.svg" alt="Parola illustration" className={styles.illustration} />
            <motion.img width="202" height="64" initial={{ opacity: 0 }} animate={{ opacity: 1 }} src="/svgs/headline.svg" alt="Ich bin keine Werbung" className={styles.headline} />
          </>
        )}
    </motion.div>
  </>
}