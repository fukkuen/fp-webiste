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
        u.display_name as author_name,
        wp2.guid as image
      FROM wp_posts wp
      LEFT JOIN wp_term_relationships rel 
        ON rel.object_id = wp.ID
      LEFT JOIN wp_term_taxonomy tax
        ON tax.term_taxonomy_id = rel.term_taxonomy_id
      LEFT JOIN wp_terms t
        ON t.term_id = tax.term_id
      LEFT JOIN wp_users u
        ON u.ID = post_author
      LEFT JOIN wp_postmeta m
        ON m.post_id = wp.ID
      LEFT JOIN wp_posts wp2
        ON wp2.ID = m.meta_value
      WHERE wp.post_status = 'publish'
        AND wp.post_type = 'post'
        AND m.meta_key = '_thumbnail_id'
      `, null, {}, (e, rows) => {
    const result = {}
    rows.forEach(row => {
      if (!result[row.post_id]) {
        result[row.post_id] = {
          post_id: row.post_id,
          post_title: row.post_title,
          post_excerpt: row.post_excerpt,
          author_id: row.author_id,
          author_name: row.author_name,
          publish_date: row.post_date,
          image: row.image,
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
    const arr = []
    for (let prop in result) {
      arr.push(result[prop])
    }
    arr.sort((a,b) => a.publish_date < b.publish_date ? 1 : -1)
    res.send(arr)
  })
})

app.get('/api/members', (req, res) => {
  c.query(`SELECT wp.post_title as member_name, wp2.guid as image
    FROM wp_posts wp
    LEFT JOIN wp_postmeta m
    ON m.post_id = wp.ID
    LEFT JOIN wp_posts wp2
    ON wp2.ID = m.meta_value
    WHERE wp.post_type = 'collective'
    AND m.meta_key = '_thumbnail_id'
    AND wp.post_status = 'publish'
    GROUP BY wp.ID`, null, {}, (e, row) => {
    res.send(row)
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
