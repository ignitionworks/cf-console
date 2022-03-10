import { getSession } from 'next-auth/react'

const apiRoutes = {
  routes: 'routes',
  apps: 'applications',
}

const results = async ({ token, route }) => {
  const result = await fetch(`http://localhost:8080/api/${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  return result.json()
}

const getRoutes =  async (req, res) => {
  const session = await getSession({ req })
  const type = req.query.type
  const route = apiRoutes[type] || 'routes'
  const data = await resuls({ token: session.accessToken, route })
  console.log('data', data)
  res.status(200).json({ data })
}

export default getRoutes
