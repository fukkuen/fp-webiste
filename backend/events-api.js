var express = require('express')
var router = express.Router()
var pool = require('./database')
var wpautop = require('./wpautop')
var chalk = require('chalk')

/**
 * get all the events in the database
 * frontend side will do the filtering
 */
router.get('/getAllEvents', async (req, res) => {
  const rows = await pool.query(`
    SELECT *
    FROM events e
    LEFT JOIN event_slots s
    ON s.event_id = e.event_id
    `)
  res.send(mergeEventSlot(rows, false))
})

/**
 * get a single event with all details
 */
router.get('/getEvent/:eventId', async (req, res) => {
  const rows = await pool.query(`
    SELECT *
    FROM events e
    LEFT JOIN event_slots s
    ON s.event_id = e.event_id
    WHERE s.event_id = ?
    `, req.params.eventId)
  res.send(mergeEventSlot(rows, true)[0])
})

/**
 * Create an event, include the slots
 * This will insert data into two different table
 */
router.post('/createEvent', async (req, res) => {
  const {title, html, cats, imageUrl, slots} = req.body
  const {insertId} = await pool.query(`
    INSERT INTO events (event_title, event_html, event_cats, image_url)
    VALUE ('${title}', '${html}', '${cats}', '${imageUrl}');  
  `)
  let query = 'INSERT INTO event_slots (event_id, start_date, end_date, slot_title) VALUES '
  slots.forEach(s => {
    query += `('${insertId}','${s.startDate}','${s.endDate}','${s.title}'),`
  })
  query = query.slice(0, query.length - 1)
  console.log(query)
  try {
    const result = await pool.query(query)
    console.log('success', result)
  } catch (e) {
    console.log(e)
  }
  res.send('done')
})

/**
 * Edit an event, include the slots
 * This will insert data into two different table
 */
router.post('/editEvent', async (req, res) => {
  let {title, html, cats, imageUrl, slots, eventId} = req.body.form
  try {
    cats = cats.join(',')
  } catch (e) {
    res.status(500).send('Cats should be an array', e)
  }
  try {
    pool.query(`
      UPDATE events
      SET event_title = ?, event_html = ?, event_cats = ?, image_url = ?
      WHERE event_id = ?
    `, [title, html, cats, imageUrl, eventId])
  } catch (e) {
    console.log(e)
  }
  const newSlots = slots.filter(s => !s.slotId)
  const oldSlots = slots.filter(s => s.slotId)
  console.log(chalk.red(JSON.stringify(newSlots)))
  if (newSlots.length) createSlots(newSlots, eventId)
  if (oldSlots.length) editSlots(oldSlots)
  res.send('done')
})

const editSlots = (slots) => {
  slots.forEach(s => {
    const {slotId, startDate, endDate, slotTitle} = s
    pool.query(`
      UPDATE event_slots
      SET start_date = ?, end_date = ?, slot_title = ?
      WHERE slot_id = ?
    `, [startDate, endDate, slotTitle, slotId])
  })
}

const createSlots = (slots, eventId) => {
  slots.forEach(s => {
    const {startDate, endDate, slotTitle} = s
    pool.query(`
      INSERT INTO event_slots(start_date, end_date, slot_title, event_id)
      VALUE (?, ?, ?, ?)
    `, [startDate, endDate, slotTitle, eventId])
  })
}

/**
 * Merge the rows with duplicated event_id by combinding the slots
 * @param rows
 * @param includeHtml
 * @returns {Array}
 */
const mergeEventSlot = (rows, includeHtml) => {
  const events = {}
  rows.forEach(r => {
    let a = r.image_url
    if (!events[r.event_id]) {
      events[r.event_id] = {
        eventId: r.event_id,
        title: r.event_title,
        imageUrl: r.image_url,
        imageUrlSm: a.slice(0, a.length - 4) + '-468x328' + a.slice(a.length - 4, a.length),
        cats: r.event_cats.split(','),
        slots: [],
        startDate: stripDate(r.start_date) // TODO: find the earliest
      }
      if (includeHtml) events[r.event_id].html = wpautop(r.event_html)
    }
    events[r.event_id].slots.push({
      startDate: stripDate(r.start_date),
      endDate: stripDate(r.end_date),
      slotTitle: r.slot_title,
      slotId: r.slot_id
    })
  })
  const eventArr = []
  for (let prop in events) {
    eventArr.push(events[prop])
  }
  eventArr.sort((a,b) => a.startDate < b.startDate ? 1 : -1)
  return eventArr
}

const stripDate = (date) => {
  return date
  // date = date.toString()
  // if (typeof date !== 'string') return
  // console.log(date.split('T')[0])
  // return date.split('T')[0]
}


router.delete('/deleteEvent/:eventId', async (req, res) => {
  //
})

router.delete('/deleteSlot/:slotId', async (req, res) => {
  //
})

module.exports = router
