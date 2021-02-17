import { useRef, useEffect } from "react"
import styles from "./chatMessage.module.scss"
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'

export default function ChatMessage(props) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props.messages]);

  // TODO Conditionally display the other message types as well

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} ref={messagesEndRef} className={props.messageAuthor === "PAROLA" ? `${styles.message}` : `${styles.message} ${styles.user}`}>
      <ReactMarkdown className={styles.messageText}>{props.messageText}</ReactMarkdown>
    </motion.div>
  )
}