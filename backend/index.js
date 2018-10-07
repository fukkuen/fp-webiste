var express = require('express')
var app = express()
var Client = require('mariasql');

//配置相关信息
var c = new Client({
  host: 'wordpress-db.cfbf3bfcunf4.us-east-2.rds.amazonaws.com',
  //用户名
  user: 'fukkuen',
  //密码默认为空
  password: 'Yy27022070',
  //使用哪个数据库
  db: 'floatingprojectscollective_net',

  charset: 'utf8'
});

c.query('SHOW DATABASES', null, { metadata: true }, function(err, rows) {
  if (err)
    throw err;
  // `rows.info.metadata` contains the metadata
  console.dir(rows);
});

app.get('/api/posts', (req, res) => {
  c.query(
    `SELECT 
        wp.ID as post_id, 
        wp.post_title, 
        wp.post_excerpt,
        wp.post_date, 
        tax.taxonomy, 
        t.slug as term_slug, 
        t.name as term_name,
        u.ID as author_id,
        u.display_name as author_name
      FROM wp_posts wp
      LEFT JOIN wp_term_relationships rel 
        ON rel.object_id = wp.ID
      LEFT JOIN wp_term_taxonomy tax
        ON tax.term_taxonomy_id = rel.term_taxonomy_id
      LEFT JOIN wp_terms t
        ON t.term_id = tax.term_id
      LEFT JOIN wp_users u
        ON u.ID = post_author
      WHERE wp.post_status = 'publish'
        AND wp.post_type = 'post'
      `, null, {}, (e, rows) => {
    const result = {}
    rows.forEach(row => {
      if (!result[row.post_id]) {
        result[row.post_id] = {
          post_title: row.post_title,
          author_id: row.author_id,
          author_name: row.author_name,
          publish_date: row.post_date,
          tags: [],
          cats: []
        }
      }
      const key = row.taxonomy === 'category' ? 'cats' : 'tags'
      result[row.post_id][key].push({
        name: row.term_name,
        slug: row.term_slug
      })
    })
    res.send(result)
  })
})

app.get('/api/posts/:id', (req, res) => {
  c.query('SELECT * FROM wp_posts p where p.ID = :id', {
    id: req.params.id
  }, (err, rows) => {
    res.send(rows[0])
  })
})

app.get('/api/test', (req, res) => {
  res.send('here!')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
