import { useState } from "react"
import styles from "../../styles/Home.module.scss"
import QuickReply from "../molecules/quickReply"

export default function QuickReplies(props) {
  const [quickRepliesText, setQuickRepliesText] = useState([
    "Wer bisch du?",
    "Was chasch du?",
    "Wieso eh Chatbot?",
    "Was für Vorteil?",
    "Du chasch Schwiizer-Dütsch?"
  ])

  const quickReplies = quickRepliesText.map(quickReply => <QuickReply removeOnboardingHandler={props.removeOnboardingHandler} handleOnboardingInfo={props.handleOnboardingInfo} key={Math.random()} text={quickReply} />)

  return (
    <div className={styles.quickRepliesContainer}>
      {quickReplies}
    </div>
  )
}