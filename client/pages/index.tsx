import Head from 'next/head'
import styles from "../styles/Home.module.scss";

import Chat from "../components/templates/Chat/chat"
import HeroInfo from "../components/organisms/HeroInfo/heroInfo"

export default function Home() {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <title>Parola Chat</title>
      <meta content="Parola Chat is a full-stack advertisement framework to develop encrypted cross-website conversational experiences with Swiss German natural language understanding/processing." name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" defer></script>
      <script src="js/w-interactions.min.js" defer></script>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <main className={styles.main}>
      <Chat />
      <HeroInfo />
    </main>
  </>
}
