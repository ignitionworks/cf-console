import {
  Button,
} from '@chakra-ui/react';

import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import Search from '../components/search'
import Orgs from '../components/orgs'

const Home = () => {
  const { data: session } = useSession()
  const [routes, setRoutes] = useState({routes: [], apps: []})

  const getRoutes = (type) => async () => {
    const result = await fetch(`http://localhost:3000/api/getRoutes?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data } = await result.json()
    setRoutes({ ...routes, ...{ [type]: data } })
  }

  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Get routes</title>
          <meta name="description" content="Now we can get routes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
        Signed in as {session.user.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
          {routes.routes.length > 0 && <Orgs orgs={routes.routes} />}
          <Search />
        </main>
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Home
