require('dotenv').config();
const express = require('express'),
  session = require('express-session'),
  massive = require('massive'),
  app = express(),
  authCtrl = require('./controllers/authController'),
  tresCtrl = require('./controllers/treasureController'),
  authMid = require('./middleware/authMiddleware'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json())

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set('db', db)
  console.log('DB CONNECTED')
}).catch(error => {
  console.log(error)
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/api/treasure/dragon', tresCtrl.dragonTreasure)
app.get('/api/treasure/user', authMid.usersOnly, tresCtrl.getUserTreasure)
app.post('/api/treasure/user', authMid.usersOnly, tresCtrl.addUserTreasure)


app.listen(SERVER_PORT, () => console.log(` Did you find somebody better on port ${SERVER_PORT}?`))