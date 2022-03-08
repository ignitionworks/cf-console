const results = async ({ username, password }) => {
  const result = await fetch(`http://localhost:8080/api/login?password=${password}&username=${username}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return result.json()
}

const getToken = async (req, res) => {
  const { password, username } = req.body
  const { value } = await results({ username, password })
  res.status(200).json({ Authorisation: value })
}

export default getToken
