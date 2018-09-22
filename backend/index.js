var express = require('express')
var app = express()
var Client = require('mariasql');

app.get('/', function (req, res) {
  res.send('Hello World')
})

//配置相关信息
var c = new Client({
  host: '127.0.0.1',
  //用户名
  user: 'root',
  //密码默认为空
  password: '',
  //使用哪个数据库
  db: 'floatingprojectscollective_net',

  charset: 'utf8'
});

app.get('/api/posts', (req, res) => {
  c.query('SELECT p.ID, p.post_title, t.name AS cat_name, t.slug AS cat_slug, t.term_id\n' +
    'FROM wp_posts p\n' +
    'LEFT JOIN wp_term_relationships rel on rel.object_id = p.ID\n' +
    'LEFT JOIN wp_term_taxonomy tax ON tax.`term_taxonomy_id` = rel.`term_taxonomy_id`\n' +
    'LEFT JOIN wp_terms t on t.`term_id` = tax.`term_id`\n' +
    'WHERE post_status = \'publish\' AND tax.taxonomy = \'category\'', null, {}, (e, rows) => {
    res.send(rows)
  })
})

app.get('/api/posts/:id', (req, res) => {
  c.query('SELECT * FROM wp_posts p where p.ID = :id', {
    id: req.params.id
  }, (err, rows) => {
    res.send(rows[0])
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
