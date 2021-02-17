import { useRef, useState, useEffect } from "react"
import Typewriter from 'typewriter-effect';
import styles from "./chatInput.module.scss"

export default function ChatInput(props) {
  const textInput = useRef(null);

  useEffect(() => {
    setInputText(props.placeholderText)
  }, [props.placeholderText])

  const handleEnter = event => {
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
            <form onSubmit={handleEnter}>
              <div id="activeInput" className={`${styles.input} ${styles.active}`}>
                <input className={styles.inputField} type="text" value={inputText} placeholder="Antwort schriibe" onChange={() => handleInputText(textInput)} ref={textInput} autoFocus />
                <div className={styles.inputButton} onClick={handleInput}>
                  <img src="/svgs/paperplane-icon.svg" alt="Send message paperplane icon" className={styles.paperplaneIcon} />
                </div>
              </div>
            </form>
          ) :
          (
            <div onClick={props.setChatState} className={styles.input}>
              <span className={styles.inputText}>
                <Typewriter
                  onInit={() => { /* Needed an onInit function, otherwise it throws an error */}}
                  options={{
                    strings: ['Probier mich us', 'Schriib mit mir', 'Stell mir eh Frag', 'Lueg was ich cha'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>
          )
      }
    </>
  )
}