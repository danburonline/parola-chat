import { useRef, useState, useEffect } from "react"
import Typewriter from 'typewriter-effect';
import styles from "./chatInput.module.scss"
import { motion } from 'framer-motion'

export default function ChatInput(props : any) {
  const textInput = useRef(null);

  useEffect(() => {
    setInputText(props.placeholderText)
  }, [props.placeholderText])

  const handleEnter = (event : any) => {
    event.preventDefault()
    event.stopPropagation()
    props.handleUserInput(textInput)
    setInputText("")
  }

  const handleInput = () => {
    props.handleUserInput(textInput)
    setInputText("")
  }

  const [inputText, setInputText] = useState(props.placeholderText)

  const handleInputText = (element) => {
    setInputText(element.current.value)
  }

  return (
    <>
      {
        props.isActive ?
          (
            <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} onSubmit={handleEnter}>
              <div id="activeInput" className={`${styles.input} ${styles.active}`}>
                <input className={styles.inputField} type="text" value={inputText} placeholder="Antwort schriibe" onChange={() => handleInputText(textInput)} ref={textInput} autoFocus />
                <div className={styles.inputButton} onClick={handleInput}>
                  <motion.img width="60" height="60" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} src="/svgs/paperplane-icon.svg" alt="Send message paperplane icon" className={styles.paperplaneIcon} />
                </div>
              </div>
            </motion.form>
          ) :
          (
            <motion.div whileHover={{ scale: 1.05 }} onClick={props.setChatState} className={styles.input}>
              <span className={styles.inputText}>
                <Typewriter
                  onInit={() => { /* Typewriter needs an onInit function, otherwise it throws an error */ }}
                  options={{
                    strings: ['Probier mich us', 'Schriib mit mir', 'Stell mir eh Frag', 'Lueg was ich cha'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </motion.div>
          )
      }
    </>
  )
}