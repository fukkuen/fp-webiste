var express = require('express')
var app = express()
var Client = require('mariasql');
var path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
})

app.use(express.static(path.join(__dirname, '../dist')))

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
  c.query('SELECT wp.ID, wp.post_title, wpm2.meta_value, term.name AS cat_name, term.slug AS cat_slug\n' +
    'FROM wp_posts wp\n' +
    'LEFT JOIN wp_postmeta wpm\n' +
    '    ON (wp.ID = wpm.post_id AND wpm.meta_key = \'_thumbnail_id\')\n' +
    'LEFT JOIN wp_postmeta wpm2\n' +
    '    ON (wpm.meta_value = wpm2.post_id AND wpm2.meta_key = \'_wp_attached_file\')\n' +
    'LEFT JOIN wp_term_relationships term_relation\n' +
    '\tON wp.ID = term_relation.object_id\n' +
    'LEFT JOIN wp_term_taxonomy term_tax\n' +
    '\tON term_relation.term_taxonomy_id = term_tax.term_taxonomy_id\n' +
    'LEFT JOIN wp_terms term\n' +
    '\tON term_tax.term_id = term.term_id\n' +
    'WHERE wp.post_type = \'post\'\n' +
    '\tAND wp.post_status = \'publish\' AND term_tax.taxonomy = \'category\'\n', null, {}, (e, rows) => {
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
