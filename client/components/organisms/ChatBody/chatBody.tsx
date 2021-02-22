import { useState, useEffect, useRef } from "react"
import styles from "./chatBody.module.scss"
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion'

import ChatInput from "../../molecules/ChatInput/chatInput"
import ChatMessage from "../../molecules/ChatMessage/chatMessage"
import Loader from "../../atoms/Loader/loader"
import Fade from "../../atoms/Fade/fade"
import QuickReplies from "../QuickReplies/quickReplies"
import OnboardingInfo from "../OnboardingInfo/onboardingInfo"
import { Konfettikanone } from "react-konfettikanone";

const variants = {
  active: {
    height: 470
  },
  inactive: {
    height: "auto"
  }
}

export default function ChatBody(props) {

  const [messages, setMessages] = useState([
    {
      _id: 1,
      author: "PAROLA",
      messageText: "Aber ich redde sehr gern drüber 😎🇨🇭",
      messageType: "txt",
      mediaSrc: ""
    },
    {
      _id: 2,
      author: "PAROLA",
      messageText: "Mit mir chasch du innovativi Chatbot Ads erstelle.",
      messageType: "TXT",
      mediaSrc: ""
    }
  ])

  const [parolaIsWriting, setParolaWriting] = useState(false)

  const [placeholderText, setPlaceholderText] = useState("")

  useEffect(() => {
    axios({
      method: 'post',
      url: props.apiUrl,
      data: {
        uuid: props.visitorId,
      },
    }).then((response) => {
      if (response.data.length === 3) {
        props.setFirstTime()
        props.setChatState()
        setMessages([...response.data])
      }

      if (response.data.length > 3) {
        let messages = response.data

        if (response.data.length > 30) { // If the chat history is longer than 40 messages, then only load display the last 40 messages
          const newArray = response.data.slice(response.data.length - 30, response.data.length - 1)
          messages = newArray
        }
        const kickOffMessage = {
          _id: Math.random(),
          author: "PAROLA",
          messageText: "🎉🎉🎉🎉🎉 Und da gseht mer sich widr! Was chani hüt für dich mache?",
          messageType: "KICK_OFF",
          mediaSrc: ""
        }
        props.setFirstTime()
        props.setChatState()
        setMessages(() => [...messages, kickOffMessage])
        props.removeOnboardingHandler()
        setTimeout(() => {
          setLaunchConfetti({ launch: true })
        }, 500)
      }
    })
  }, [])

  useEffect(() => {
    if (props.firstTime) {
      if (props.isActive) {
        let newOnboardingMessage = {
          _id: 3,
          author: "PAROLA",
          messageText: "Wenn du meh wüsse willsch, frag mich, was ich chan oder wer ich bi 🤓",
          messageType: "TXT",
          mediaSrc: ""
        }
        setMessages(prevState => [...prevState, newOnboardingMessage])

        axios({
          method: 'post',
          url: props.apiUrl + "/new",
          data: {
            uuid: props.visitorId,
            conversations: [...messages, newOnboardingMessage]
          },
        }).then((response) => {
          setMessages([...response.data])
        })
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
      props.removeOnboardingHandler()
      setParolaWriting(true)
      const newMessage = {
        _id: Math.random(),
        author: "USER",
        messageText: textInput.current.value,
        messageType: "TXT",
        mediaSrc: ""
      }

      setMessages(prevState => [...prevState, newMessage])

      axios({
        method: 'post',
        url: props.apiUrl + "/add",
        data: {
          uuid: props.visitorId,
          conversations: [newMessage]
        },
      }).then((response) => {
        setTimeout(() => {
          setMessages(prevState => [...prevState, ...response.data.slice(response.data.length - 1)])
          setParolaWriting(false)
        }, 500)
        textInput.current.value = '';
        if (showOnboardingInfo) {
          setOnboardingInfo(prevState => false)
        }
      })
    }
  };

  const [launchConfetti, setLaunchConfetti] = useState({
    launch: false
  })

  const chatMessages = messages.map(message => <ChatMessage key={message._id} messageText={message.messageText} messageAuthor={message.author} messageType={message.messageType} mediaSrc={message.mediaSrc} />)

  return <>
    <motion.div
      variants={variants}
      animate={props.isActive ? "active" : "inactive"}
      className={props.isActive ? `${styles.chatMain} ${styles.active}` : `${styles.chatMain}`}>
      {chatMessages}
      {parolaIsWriting ? <Loader /> : null}
    </motion.div>
    {props.isActive ? <Fade /> : null}
    {props.onboarding && props.isActive ? <QuickReplies removeOnboardingHandler={props.removeOnboardingHandler} handleOnboardingInfo={onboardingInfoHandler} /> : null}
    <AnimatePresence>
      {showOnboardingInfo ?
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}>
          <OnboardingInfo />
        </motion.div> : null}
    </AnimatePresence>
    <ChatInput handleUserInput={handleUserInput} placeholderText={placeholderText} isActive={props.isActive} setChatState={props.setChatState} />
    <div className={styles.confettiWrapper}>
      <Konfettikanone {...launchConfetti}></Konfettikanone>
    </div>
  </>
}