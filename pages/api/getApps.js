const results = async ({username, password}) => {
  const result = await fetch(`http://localhost:8080/api/login?password=${password}&username=${username}`)
  console.log('stdd', result)
  return result
}

const getToken = async (req, res) => {
  console.log('req', req)
  const { password, username } = req
  console.log('pasword', password)
  const token = await results({ username, password })
  res.status(200).json({ Authorisation: token })
}

export default getToken
