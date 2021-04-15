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
            <h1 className={styles.header}>Register</h1>
          <input type='text' name='name' placeholder='Name' className={styles.input}/>
          <input type='text' name='email' placeholder='Email' className={styles.input}/>
          <input type='password' name='password' placeholder='Password' className={styles.input}/>
          <input type='button' value='Register' className={styles.button}/>
        </div>

        <div className='right'>
          Face Detect
          <p className={styles.info}>Already registered? You can <Link href="/"><a>sign-in</a></Link> here.</p>
        </div>
      </ContentContainer>
      
    </>
  )
}
