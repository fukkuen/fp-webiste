CREATE TABLE events AS
  SELECT
      wp.ID as event_id,
      wp.post_title as event_title,
      wp.post_content as event_html,
      wp.post_date as created_date,
      wp2.guid as image_url
    FROM wp_posts wp
    LEFT JOIN wp_postmeta m
      ON m.post_id = wp.ID
    LEFT JOIN wp_posts wp2
      ON wp2.ID = m.meta_value
    WHERE wp.post_status = 'publish'
      AND wp.post_type = 'portfolio'
      AND m.meta_key = '_thumbnail_id'

ALTER TABLE events
  ADD event_cats VARCHAR(255)


## generate the SQL to update the event_cats column
UPDATE events
          SET event_cats = 'stock-taking,wip-inspection,artistic-production'
          WHERE event_id = 5203; UPDATE events
          SET event_cats = 'stock-taking,wip-inspection,artistic-production'
          WHERE event_id = 5093; UPDATE events
          SET event_cats = 'stock-taking,wip-inspection'
          WHERE event_id = 5061;
          ...

CREATE TABLE event_slots AS
	SELECT event_id, created_date as start_date from events

ALTER TABLE event_slots
ADD end_date DATETIME;

ALTER TABLE event_slots
ADD slot_title TEXT;

ALTER TABLE event_slots
ADD slot_id VARCHAR(255) PRIMARY KEY;


