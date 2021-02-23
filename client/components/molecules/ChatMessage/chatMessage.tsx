import { useRef, useEffect, useState } from "react"
import styles from "./chatMessage.module.scss"
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import Slider from "react-slick";

export default function ChatMessage(props) {

  var sliderSettings = {
    dots: true,
    arrows: false,
    dotsClass: "customDots" // Class can be found in the globals.scss file
  };

  const variants = {
    active: { scale: [1, 1.05, 1], opacity: [1, 0.75, 1] },
    inactive: { scale: 1, opacity: 1 }
  }

  const [kickOffMessage, setKickOffMessage] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    const timer = setTimeout(() => {
      setKickOffMessage(false)
    }, 5000) // Set the state for the kickOffMessage to false so that it won't animate the kick-off message every time again
    return () => clearTimeout(timer); // Clear the setTimeout function to eliminate memory leaks
  }, [props.messages]);

  return <>
    {props.messageType == "KICK_OFF" ?
      (<>
        <h3 ref={messagesEndRef} className={styles.onboardMessageHeader}>— Neui Nachricht —</h3>
        <motion.div transition={{ repeat: 3 }} animate={!kickOffMessage ? variants.inactive : variants.active} className={styles.message}>
          <ReactMarkdown className={styles.messageText}>{props.messageText}</ReactMarkdown>
        </motion.div>
      </>) : props.messageType == "IMAGE" ? (<>
        <div ref={messagesEndRef} className={styles.message}>
          <p className={styles.messageText}>{props.messageText}</p>
        </div>
        <div className={`${styles.message} ${styles.image}`}>
          <img src={props.mediaSrc[0]} className="image" />
        </div>
      </>)
        : props.messageType == "VIDEO" ? (<>
          <div ref={messagesEndRef} className={styles.message}>
            <p className={styles.messageText}>{props.messageText}</p>
          </div>
          <div className={`${styles.message} ${styles.video}`}>
            <div className={`${styles.video} ${"w-video"} ${"w-embed"}`} >
              <iframe
                title="Video player"
                src={props.mediaSrc[0]}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
              </iframe>
            </div>
          </div>
        </>)
          : props.messageType == "SLIDER" ? (
            <>
              <div className={styles.message}>
                <p className={styles.messageText}>{props.messageText}</p>
              </div>
              <div ref={messagesEndRef} className={`${styles.chatSlider}`}>
                <div className={`${styles.sliderMask} ${"w-slider-mask"}`}>
                  <Slider {...sliderSettings}>
                    {props.mediaSrc.map((item) => (
                      <div key={Math.random()} className={`${styles.slide} ${"w-slide"}`}>
                        <a href={item.url} target="_blank" className={`${styles.sliderLink} ${"w-inline-block"} ${"w-clearfix"}`}>
                          <div className={styles.sliderImage} style={{ backgroundImage: `url(\'${item.img}\')` }}></div>
                          <h3 className={styles.sliderHeading}>{item.title}</h3>
                          <p className={styles.sliderText}>{item.descr}</p>
                          <img src="/svgs/link-icon.svg" alt="Link icon" className={`${styles.linkIcon} ${styles.slider}`} />
                        </a>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </>
          ) :
            (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} ref={messagesEndRef} className={props.messageAuthor === "PAROLA" ? `${styles.message}` : `${styles.message} ${styles.user}`}>
                <ReactMarkdown className={styles.messageText}>{props.messageText}</ReactMarkdown>
              </motion.div>
            )
    }
  </>
}