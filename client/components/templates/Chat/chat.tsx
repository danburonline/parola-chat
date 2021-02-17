import styles from "./chat.module.scss"
import { useState } from "react"

import ChatBody from "../../organisms/ChatBody/chatBody"
import ChatHeader from "../../organisms/ChatHeader/chatHeader"

export default function Chat(props) {
  const [chatState, setChatState] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const [needsOnboarding, setOnboarding] = useState(true)

  const chatAlreadyExistsHandler = () => {
    setChatState(true)
  }

  const removeOnboardingHandler = () => {
    setOnboarding(false)
  }

  const setFirstTimeHandler = () => {
    setFirstTime(false)
  }

  return (
    <div className={styles.chat}>
      <ChatHeader isActive={chatState} />
      <ChatBody visitorId={props.visitorId} isActive={chatState} onboarding={needsOnboarding} removeOnboardingHandler={removeOnboardingHandler} setChatState={chatAlreadyExistsHandler} apiUrl={props.apiUrl} firstTime={firstTime} setFirstTime={setFirstTimeHandler} />
    </div>
  )
}