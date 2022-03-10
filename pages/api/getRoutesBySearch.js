import { getSession } from 'next-auth/react'

const cfApiHost = process.env.CF_API_HOST

const results = async ({ token, searchTerm }) => {
  const result = await fetch(`${cfApiHost}/api/routes/search?query=${searchTerm}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  })

  return result.json()
}

const getRoutesBySearch =  async (req, res) => {
  const session = await getSession({ req })
  const searchTerm = req.query.query
  const data = await results({ token: session.accessToken, searchTerm })
  console.log('data', data)
  res.status(200).json({ data })
}

export default getRoutesBySearch
