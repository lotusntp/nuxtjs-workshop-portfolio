const express = require('express')

const cors = require('cors')

const mockToken =
  '9a7e60662f723eb6a70b86be84c94b5d6a01662cf443cab138bd5124c64e33d7'
const mockUser = {
  id: 1,
  name: 'Natthaphorn Jaicahaliew',
  email: 'Natthaphorn@test.con',
}

const app = express()

app.use(cors())
app.use(express.json())

app.get('/me', (req, res) => {
  const headers = req.headers.authorization

  const token = headers && headers.split(' ')[1] // Bearer <TOKEN>

  if (token === mockToken) {
    return res.json({
      user: mockUser,
    })
  } else {
    return res.status(401).json({
      message: 'Invalid token',
    })
  }
})

app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (email === 'admin@admin.com' && password === '123456') {
    return res.json({
      user: mockUser,
      token: mockToken,
    })
  } else {
    return res.status(401).json({
      message: 'Invalid password',
    })
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
