import styles from "./button.module.scss"
import { motion } from 'framer-motion'

export default function Button() {
  return (
    <motion.a
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      rel="noopener"
      href="https://github.com/danburonline/parola-chat"
      target="_blank"
      className={styles.link}
    >
      <div className={styles.button}>
        <img width="20" height="15" src="/svgs/code-icon.svg" alt="Code icon" className={styles.buttonIcon} />
        <p className={styles.buttonText}>Fork Code</p>
      </div>
    </motion.a>
  )
}