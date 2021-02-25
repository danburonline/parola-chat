import {useEffect, useState} from "react"
import styles from "./chatBody.module.scss"
import axios from 'axios';
import {AnimatePresence, motion} from 'framer-motion'

import ChatInput from "../../molecules/ChatInput/chatInput"
import ChatMessage from "../../molecules/ChatMessage/chatMessage"
import Loader from "../../atoms/Loader/loader"
import Fade from "../../atoms/Fade/fade"
import QuickReplies from "../QuickReplies/quickReplies"
import OnboardingInfo from "../OnboardingInfo/onboardingInfo"
import {Konfettikanone} from "react-konfettikanone";

export default function ChatBody(props : any) {

  // Settings object for the Framer Motion library
  const variants = {
    active: {
      height: 470
    },
    inactive: {
      height: "auto"
    }
  }

  // Define the first two messages which will be displayed when the user didn't interact with the ad
  const [messages, setMessages] = useState([
    {
      _id: 1,
      author: "PAROLA",
      messageText: "Aber ich redde sehr gern drüber 😎🇨🇭",
      messageType: "TXT",
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
  const [showOnboardingInfo, setOnboardingInfo] = useState(false)
  const [launchConfetti, setLaunchConfetti] = useState({ launch: false })

  useEffect(() => {
    axios({
      method: 'post',
      url: props.apiUrl,
      data: {
        uuid: props.visitorId,
      },
    }).then((response) => {
      if (response.data.length === 3) {
        // If the API returns exactly three messages, it means that the user
        // clicked on the button but didn't write anything, therefore
        // the ad shows already the active state but still the
        // onboarding infos and quick replies
        props.setFirstTime()
        props.setChatState()
        setMessages([...response.data])
      }

      if (response.data.length > 3) {
        let messages = response.data

        if (response.data.length > 30) { // If the chat history is longer than 30 messages, then only display the last 30 messages
          messages = response.data.slice(response.data.length - 30, response.data.length - 1)
        }

        // When the user re-visits the ad, this onboarding message will always be displayed
        const kickOffMessage = {
          _id: Math.random(),
          author: "PAROLA",
          messageText: "🎉🎉🎉🎉🎉 Und da gseht mer sich widr! Und etzt frag mich schnell, dassi dich überrasche sell 😉",
          messageType: "KICK_OFF",
          mediaSrc: ""
        }

        props.setFirstTime()
        props.setChatState()
        setMessages(() => [...messages, kickOffMessage])
        props.removeOnboardingHandler()
        setTimeout(() => {
          setLaunchConfetti({ launch: true })
        }, 500) // Added a small delay so that not all animations run at the same time (performance reasons)
      }
    })
  }, [])

  useEffect(() => {
    if (props.firstTime) {
      if (props.isActive) {

        // This is the message which will be added if the user clicks on the intro button (first interaction with the ad)
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
        })
      }
    }
  }, [props.isActive])

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
        _id: Math.random(), // Setting a random ID for now => will be replaced on the database
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
          setMessages(prevState => [...prevState, ...response.data])
          setParolaWriting(false)
        }, 750)
        textInput.current.value = '';
        if (showOnboardingInfo) {
          setOnboardingInfo(false)
        }
      })
    }
  };

  const chatMessages = messages.map(message =>
    <ChatMessage
      key={message._id}
      messageText={message.messageText}
      messageAuthor={message.author}
      messageType={message.messageType}
      mediaSrc={message.mediaSrc} />
  )

  return <>
    <motion.div
      variants={variants}
      animate={props.isActive ? "active" : "inactive"}
      className={props.isActive ? `${styles.chatMain} ${styles.active}` : `${styles.chatMain}`}>
      {chatMessages}
      {parolaIsWriting ? <Loader /> : null}
    </motion.div>
    {props.isActive ? <Fade /> : null}
    {props.onboarding && props.isActive ?
      <QuickReplies removeOnboardingHandler={props.removeOnboardingHandler} handleOnboardingInfo={onboardingInfoHandler} /> : null}
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
