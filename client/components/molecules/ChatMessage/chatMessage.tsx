import { useRef, useEffect, useState } from "react"
import styles from "./chatMessage.module.scss"
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'

export default function ChatMessage(props) {
  const variants = {
    active: { scale: [1, 1.05, 1], opacity: [1, 0.75, 1] },
    inactive: { scale: 1, opacity: 1 }
  }

  const [kickOffMessage, setKickOffMessage] = useState(true)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    const timer = setTimeout(() => {
      setKickOffMessage(false)
    }, 5000) // Stop the state for the kickOffMessage so that it won't animate the kick-off message every time
    return () => clearTimeout(timer); // Clear the setTimeout function to eliminate memory leaks
  }, [props.messages]);

  // TODO Conditionally display the other message types as well

  return <>
    {props.messageType == "KICK_OFF" ?
      (<>
        <h3 className={styles.onboardMessageHeader}>–– Neui Nachricht ––</h3>
        <motion.div transition={{ repeat: 3 }} animate={!kickOffMessage ? variants.inactive : variants.active} ref={messagesEndRef} className={styles.message}>
          <ReactMarkdown className={styles.messageText}>{props.messageText}</ReactMarkdown>
        </motion.div>
      </>) :
      (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} ref={messagesEndRef} className={props.messageAuthor === "PAROLA" ? `${styles.message}` : `${styles.message} ${styles.user}`}>
          <ReactMarkdown className={styles.messageText}>{props.messageText}</ReactMarkdown>
        </motion.div>
      )
    }
  </>
}