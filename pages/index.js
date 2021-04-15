import Head from 'next/head'
import Link from 'next/link'
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
          <h1 className={styles.header}>Sign-In</h1>
          <input type='text' name='username' placeholder='Email' className={styles.input}/>
          <input type='password' name='password' placeholder='Password' className={styles.input}/>
          <input type='button' value='Log In' className={styles.button}/>
        </div>

        <div className='right'>
          Face Detect
          <p className={styles.info}>Please sign in to continue.  If you 
          don't have a username please <Link href="/register"><a>register to continue</a></Link>.</p>
        </div>
      </ContentContainer>
      
    </>
  )
}
