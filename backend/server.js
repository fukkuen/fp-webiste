var pool = require('./database')
var express = require('express')
var app = express()
var wpautop = require('./wpautop')
var eventsApi = require('./events-api')
var bodyParser = require('body-parser');
var chalk = require('chalk');
var AWS = require('aws-sdk')
var s3 = new AWS.S3()
var multer  = require('multer')
var upload = multer()
app.use(bodyParser.json())

const testConnection = async () => {
  try {
    await pool.query('SHOW DATABASES')
    console.log('connected to DB')
  } catch (e) {
    console.log('Error', e)
  }
}

testConnection()

app.use((req, res, next) => {
  console.log(chalk.cyan(req.path))
  console.log(chalk.yellow(JSON.stringify(req.body)))
  next()
})

app.get('/api/v1/posts', (req, res) => {
  pool.query(
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
        let a = row.image
        if (!result[row.post_id]) {
          result[row.post_id] = {
            post_id: row.post_id,
            post_title: row.post_title,
            post_excerpt: row.post_excerpt,
            author_id: row.author_id,
            author_name: row.author_name,
            publish_date: row.post_date,
            image: row.image,
            imageSm: a.slice(0, a.length - 4) + '-468x328' + a.slice(a.length - 4, a.length),
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
      let arr = []
      for (let prop in result) {
        arr.push(result[prop])
      }
      arr.sort((a,b) => a.publish_date < b.publish_date ? 1 : -1)
      if (req.query.limit) {
        arr = arr.slice(0, req.query.limit)
      }
      res.send(arr)
    })
})


app.get('/api/v1/events', (req, res) => {
  pool.query(
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
        AND wp.post_type = 'portfolio'
        AND tax.taxonomy = 'portfolio_category'
        AND m.meta_key = '_thumbnail_id'
      `, null, {}, (e, rows) => {
      const result = {}
      rows.forEach(row => {
        if (!result[row.post_id]) {
          result[row.post_id] = {
            event_id: row.post_id,
            event_title: row.post_title,
            event_html: row.post_excerpt,
            author_id: row.author_id,
            author_name: row.author_name,
            publish_date: row.post_date,
            image: row.image,
            tags: [],
            cats: [],
            event_cats: []
          }
        }
        result[row.post_id].cats.push({
          name: row.term_name,
          slug: row.term_slug
        })
        result[row.post_id].event_cats.push(row.term_slug)
      })
      const arr = []
      for (let prop in result) {
        arr.push(result[prop])
      }
      arr.sort((a,b) => a.publish_date < b.publish_date ? 1 : -1)

      /* Migration SQL
      let sql = ''
      arr.forEach(row => {
        sql += `UPDATE events
          SET event_cats = '${row.event_cats}'
          WHERE event_id = ${row.event_id}; `
      })
      pool.query(sql)
      */
      res.send(arr)
    })
})


app.get('/api/members', (req, res) => {
  pool.query(`SELECT wp.post_title as member_name, wp2.guid as image
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

app.get('/api/v1/posts/:id', (req, res) => {
  pool.query('SELECT * FROM wp_posts p where p.ID = :id', {
    id: req.params.id
  }, (err, rows) => {
    const post = rows[0]
    post.post_content = wpautop(post.post_content)
    res.send(rows[0])
  })
})

app.get('/api/test', (req, res) => {
  res.sendStatus(200)
})

app.get('/api/s3', (req, res) => {
  s3.createBucket({
    Bucket: 'test2xsjdfhjdkshfkjdshf'
  }, (err, data) => {
    console.log('s3 callback:', err, data)
    res.status(200).send('done')
  })
})

app.use('/api/events', eventsApi)

app.post('/api/image/upload', upload.single('image'), (req, res) => {
  const file = req.file
  console.log(file)
  console.log(file.buffer)
  var params = {
    Bucket: 'floating',
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read'
  }
  s3.upload(params, function(err, data) {
    if (err) res.status(400).send('GG')
    else res.status(200).send(data.Location)
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
