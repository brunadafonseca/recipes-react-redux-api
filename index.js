const express = require('express')
const { recipes, users, sessions } = require('./routes')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const cors = require('cors')

const PORT = process.env.PORT || 3030

let app = express()

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(recipes)
  .use(users)
  .use(sessions)

  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })


  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
