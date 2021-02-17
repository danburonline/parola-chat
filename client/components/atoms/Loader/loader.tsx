import styles from "./loader.module.scss"
import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} className={styles.loader}>
      <img src="/svgs/loading-dots-icon.svg" alt="Loading indicator icon" className={styles.loaderDotsIcon} />
    </motion.div>
  )
}