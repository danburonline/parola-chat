import styles from "./onboardingInfo.module.scss"

export default function OnboardingInfo() {
  return (
    <div className={styles.onboardingInfo}>
      <p className={styles.onboardingText}><strong>Schriib</strong> dini Nachricht und <br /><strong>drück Enter</strong> oder klick uf <br />de Button</p>
      <img src="/svgs/onboarding-arrow.svg" alt="Onboarding icon" className={styles.onboardingIcon} />
    </div>
  )
}