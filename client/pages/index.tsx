import { useEffect, useState } from "react"
import Head from 'next/head'
import styles from "../styles/Home.module.scss";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

import Chat from "../components/templates/Chat/chat"
import HeroInfo from "../components/organisms/HeroInfo/heroInfo"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from "react-loader-spinner";

export async function getStaticProps() {
  return {
    props: {
      API_URL: process.env.API_URL,
      FS_TOKEN: process.env.FS_TOKEN,
      REGION: process.env.REGION
    }
  }
}

export default function Home(props: any) {
  const [visitorId, setVisitorId] = useState("")

  useEffect(() => {
    const fetchVisitorId = async () => {
      const fingerPrint = await FingerprintJS.load({
        token: props.FS_TOKEN,
        region: props.REGION,
      });
      const result = await fingerPrint.get();
      const resultVisitorId = result.visitorId;
      setVisitorId(resultVisitorId)

      // ? Uncomment for development purposes (to use the API in an API software)
      // console.log(visitorId)
    }

    fetchVisitorId()
  }, [visitorId])

  return <>
    <Head >
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
      <title>Parola Chat</title>
      <meta content="Parola Chat is a full-stack advertisement framework to develop encrypted cross-website conversational experiences with Swiss German natural language understanding/processing." name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" defer></script>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <main className={styles.main}>
      {visitorId ?
        <Chat visitorId={visitorId} apiUrl={props.API_URL} /> :
        <div className={styles.spinnerWrapper}>
          <Spinner
            type="ThreeDots"
            color="white"
            height={75}
            width={75}
            timeout={5000} />
        </div>}
      <HeroInfo />
    </main>
  </>
}
