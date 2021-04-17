import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Link from 'next/link'
import ContentContainer from '../containers/contentContainer'
import FaceRecognitionDisplay from '../components/recognitionDisplay'
import styles from '../styles/Home.module.css'
import { useState} from 'react'
import { app } from '../utils/clarifai'
import { parseClarifaiData} from '../utils/helpers'

export default function Home() {
  //states
  const [input, setInput] = useState('')
  const [boundingBoxes, setBoundingBoxes] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  //Auth0 grabs
  const { user, error, isLoading } = useUser()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  
  //there's probably a better way than doing a db update every time they hit submit
  //but this is what I went with in the end
  const updateCount = async () => {
    try {
      user.entries++
      await fetch(`http://localhost:3000/api/users/${user.uniqueID}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({entries: user.entries})
      })

    } catch (error) {
      console.log(error)
    }
    
  }
  
  //todo: make sure the image changed before updating count
  //make sure we get a valid response before updating count
  const onSubmit = () => {
    setImgUrl(input)
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", //face-detect model_id
      input //since setSTate is asynch, using input instead of imgUrl
    )
    .then(
      response => {
        setBoundingBoxes(parseClarifaiData(response))
      }, 
      err => console.log(new Error(err))
    )
    updateCount()
  }

  return (
    <>
      <Head>
        <title>Face Detection App</title>
      </Head>

      <ContentContainer>
       <div className='left'>
          {
            user &&
            <>
            <p>Image Count: {user.entries}</p>
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
              <FaceRecognitionDisplay boxes={boundingBoxes} image={imgUrl}/>
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
