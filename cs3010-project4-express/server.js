const bcrypt = require('bcrypt');
const pg = require('pg');
const { Client } = pg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'pg_express',
  user: 'postgres',
  password: 'postgres',
});

(async() => {
  await client.connect();
  console.log("Connected to postgresql database");
})();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {
  const req_uname = req.body.username;
  const req_pword = req.body.password;
  console.log('Login request for ' + req_uname);
  const db_pword_res = await client.query("SELECT password FROM user_accounts WHERE user_name = '" + req_uname + "'");
  if (db_pword_res.rows.length == 0) {
    res.sendStatus(400);
  } else if (await bcrypt.compare(req_pword, db_pword_res.rows[0].password)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.post('/registration', async (req, res) => {
  const req_uname = req.body.username;
  const req_pword = req.body.password;
  await bcrypt.hash(req_pword, 10, async function(err, hash) {
    console.log('Registration request for ' + req_uname);
    const db_uname_res = await client.query("SELECT * FROM user_accounts WHERE user_name = '" + req_uname + "'");
    if (db_uname_res.rows.length == 0) {
      await client.query("INSERT INTO user_accounts (user_name, password) VALUES ('" + req_uname + "', '" + hash + "')");
      const db_id_res = await client.query("SELECT id FROM user_accounts WHERE user_name = '" + req_uname + "'");
      res.sendStatus(201);
    } else {
      res.sendStatus(409);
    }
  });
});

app.post('/account', (req, res) => {
  console.log('Account');
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/account', (req, res) => {

});

app.put('/account', (req, res) => {

});

(async() => {
  const result = await client.query('SELECT * FROM user_accounts');
  console.log(result.rows.length);
})();

app.listen(8080);
