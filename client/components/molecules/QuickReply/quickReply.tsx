import styles from "./quickReply.module.scss"

export default function QuickReply(props) {
  return (
    <div className={styles.quickReply} onClick={() => {
      props.handleOnboardingInfo(props.text)
      props.removeOnboardingHandler()
    }}>
      <p className={styles.quickReplyText}>{props.text}</p>
    </div>
  )
}