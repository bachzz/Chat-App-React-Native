const Pool = require('pg').Pool
const pool = new Pool({
  user: 'bachng',
  host: 'localhost',
  database: 'chatapp_test',
  password: 'abcd1234',
  port: 5432,
})

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    //res.send(results.rows);
    console.log(results.rows);
    res.status(200).json(results.rows)
  })
}

const login = (req, res) => {
  //res.send("You've logged in!");
  //console.log(req.body);
  const msg = {
    email: req.body.email,
    password: req.body.password,
    token: '12345'
  };
  res.status(200).json(msg);
}

module.exports = {getUsers, login};
