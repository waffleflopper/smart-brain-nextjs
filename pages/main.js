import Head from 'next/head'
import ContentContainer from '../containers/contentContainer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Face Detection App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentContainer>
       <div className='left'>
          <h1 className={styles.header}>Paste Image Link</h1>
          <input type='text' name='imageUrl' placeholder='http://' className={styles.input}/>
          <input type='button' value='Detect!' className={styles.button}/>
        </div>

        <div className='right'>
          Face Detect
          <p className={styles.info}>Paste an image on the left and click the detect button.  After a small computing time
          the faces will be detected and drawn.</p>
        </div>
      </ContentContainer>
      
    </>
  )
}
