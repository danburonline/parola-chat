import styles from "../../styles/Home.module.scss"
import { useState } from "react"

import ChatBody from "../organisms/chatBody"
import ChatHeader from "../organisms/chatHeader"

export default function Chat() {

  const [chatState, setChatState] = useState({
    needsOnboarding: true,
    chatAlreadyExists: false
  })

  const chatAlreadyExistsHandler = () => {
    setChatState({
      ...chatState,
      chatAlreadyExists: true
    })
  }

  const removeOnboardingHandler = () => {
    setChatState({
      ...chatState,
      needsOnboarding: false
    })
  }

  return (
    <div className={styles.chat}>
      <ChatHeader isActive={chatState.chatAlreadyExists} />
      <ChatBody isActive={chatState.chatAlreadyExists} onboarding={chatState.needsOnboarding} removeOnboardingHandler={removeOnboardingHandler} setChatState={chatAlreadyExistsHandler} />
    </div>
  )
}