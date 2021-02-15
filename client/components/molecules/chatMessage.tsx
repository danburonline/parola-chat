import { useRef, useEffect } from "react"
import styles from "../../styles/Home.module.scss"

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
    <div ref={messagesEndRef} className={props.messageAuthor === "parola" ? `${styles.message}` : `${styles.message} ${styles.user}`}>
      <p className={styles.messageText}>{props.messageText}</p>
    </div>
  )
}