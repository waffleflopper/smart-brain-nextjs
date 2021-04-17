import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Link from 'next/link'
import ContentContainer from '../containers/contentContainer'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'
import { app } from '../utils/clarifai'
import parseClarifaiData from '../utils/parseClarifaiData'

export default function Home() {
  //states
  const [input, setInput] = useState('')
  const [boundingBoxes, setBoundingBoxes] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const [boxDivs, setBoxDivs] = useState([])

  //refs
  const imageElement = useRef(null) //so we can populate a src once image is submitted
  const infoElement = useRef(null) //so we can hide it after image is submitted


  const { user, error, isLoading } = useUser()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  //calculate boxes function
  //useEffect for box generation detection
  
  const onSubmit = () => {
    setImgUrl(input);

    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", //face-detect model_id
      input //since setSTate is asynch, using input instead of imgUrl
    )
    .then(
      response => setBoundingBoxes(parseClarifaiData(response)), 
      err => console.log(new Error(err))
    )
  }

  return (
    <>
      <Head>
        <title>Face Detection App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentContainer>
       <div className='left'>
          {
            user &&
            <>
            <h1 className={styles.header}>Paste image link below</h1>
            <input type='text' onChange={e => setInput(e.target.value)} name='imageUrl' placeholder='http://your.image.link.here' className={styles.input}/>
            <input type='button' value='Detect!' onClick={onSubmit} className={styles.button}/>
            <Link href="/api/auth/logout"><div className={styles.logout}><a className="blue">logout</a></div></Link>
            </>

          }
          {
            !user &&
            <>
            <h1 className={styles.header}>Sign-In</h1>
            <div className="autoBottom">Please <Link href="/api/auth/login"><a className="blue">login</a></Link> to continue.</div>
            </>
          }

        </div>

        <div className='right'>
          {
            user &&
            <>
              Face Detect
              <p className={styles.info}>Hello {user.given_name}, you have submitted {user.entries} image(s)</p>
            </>
          }
          {
            !user &&
            <>
            Face Detect
            <p className={styles.info}>Please sign in to continue.  We use Auth0 so you'll have multiple options
            for logging in.</p>
            </>
          }

          
        </div>
      </ContentContainer>
      
    </>
  )
}
