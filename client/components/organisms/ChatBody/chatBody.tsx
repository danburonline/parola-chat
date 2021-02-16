import { useState, useEffect, useRef } from "react"
import styles from "./chatBody.module.scss"

import ChatInput from "../../molecules/ChatInput/chatInput"
import ChatMessage from "../../molecules/ChatMessage/chatMessage"
import Loader from "../../atoms/Loader/loader"
import Fade from "../../atoms/Fade/fade"
import QuickReplies from "../QuickReplies/quickReplies"
import OnboardingInfo from "../OnboardingInfo/onboardingInfo"

export default function ChatBody(props) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "parola",
      text: "Aber ich redde sehr gern drüber 😎🇨🇭",
      type: "txt",
      mediaSrc: ""
    },
    {
      id: 2,
      author: "parola",
      text: "Mit mir chasch du innovativi Chatbot Ads erstelle.",
      type: "text",
      mediaSrc: ""
    }
  ])

  const [parolaIsWriting, setParolaWriting] = useState(false)

  const loadNewOnboardingMessageHandler = () => {
    let newOnboardingMessage = {
      id: 3,
      author: "parola",
      text: "Wenn du meh wüsse willsch, frag mich, was ich chan oder wer ich bi 🤓",
      type: "text",
      mediaSrc: ""
    }

    setMessages(prevState => [...prevState, newOnboardingMessage])
    setParolaWriting(false)
  }

  const [placeholderText, setPlaceholderText] = useState("")

  // Add new onboarding message as soon as the user enters the onboarding screen for the first time
  useEffect(() => {
    if (props.isActive) {
      if (messages.length === 2) {
        setParolaWriting(true)
        setTimeout(loadNewOnboardingMessageHandler, 1000) // Short delay => makes it look more human
      }
    }
  }, [props.isActive])

  const [showOnboardingInfo, setOnboardingInfo] = useState(false)

  const onboardingInfoHandler = (text) => {
    setPlaceholderText(text)
    setOnboardingInfo(prevState => !prevState)
  }

  const handleUserInput = (textInput) => {
    let text = textInput.current.value.replace(/\s/g, ''); // Prevent sending empty messages

    if (text.length > 0) {
      const newMessage = {
        id: Math.random(),
        author: "user",
        text: textInput.current.value,
        type: "text",
        mediaSrc: ""
      };

      setParolaWriting(true)
      setMessages(prevState => [...prevState, newMessage])
      textInput.current.value = '';
      props.removeOnboardingHandler()

      if (showOnboardingInfo) {
        setOnboardingInfo(prevState => false)
      }
    }
  };

  const chatMessages = messages.map(message => <ChatMessage key={message.id} messageText={message.text} messageAuthor={message.author} messageType={message.type} mediaSrc={message.mediaSrc} />)

  return <>
    <div className={props.isActive ? `${styles.chatMain} ${styles.active}` : `${styles.chatMain}`}>
      {chatMessages}
      {parolaIsWriting ? <Loader /> : null}
    </div>
    {props.isActive ? <Fade /> : null}
    {props.onboarding && props.isActive ? <QuickReplies removeOnboardingHandler={props.removeOnboardingHandler} handleOnboardingInfo={onboardingInfoHandler} /> : null}
    {showOnboardingInfo ? <OnboardingInfo /> : null}
    <ChatInput handleUserInput={handleUserInput} placeholderText={placeholderText} isActive={props.isActive} setChatState={props.setChatState} />
  </>
}