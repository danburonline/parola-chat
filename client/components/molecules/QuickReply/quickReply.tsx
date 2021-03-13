import styles from "./quickReply.module.scss"
import { motion } from 'framer-motion'

export default function QuickReply(props: any) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className={styles.quickReply} onClick={() => {
      props.handleOnboardingInfo(props.text)
    }}>
      <p className={styles.quickReplyText}>{props.text}</p>
    </motion.div>
  )
}