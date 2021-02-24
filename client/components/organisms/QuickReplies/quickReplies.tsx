import { useState } from "react"
import styles from "./quickReplies.module.scss"
import QuickReply from "../../molecules/QuickReply/quickReply"
import { motion } from 'framer-motion'

export default function QuickReplies(props: any) {

  const [quickRepliesText] = useState([
    "Wer bisch du?",
    "Was chasch du?",
    "Wieso eh Chatbot?",
    "Was für Vorteil?",
    "Du chasch Schwiizer-Dütsch?"
  ])

  const quickReplies = quickRepliesText.map(quickReply => (
    <QuickReply
      removeOnboardingHandler={props.removeOnboardingHandler}
      handleOnboardingInfo={props.handleOnboardingInfo}
      key={Math.random()}
      text={quickReply} />
  ))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.quickRepliesContainer}>
      {quickReplies}
    </motion.div>
  )
}