CREATE VIEW email_count_by_status AS
SELECT e.date, e.status, COUNT(*) AS count
FROM emails e
       JOIN settings s ON substring(e."to" from '\+(.*)@') = s.email_alias_identifier
       JOIN profiles p ON s.id = p.id
GROUP BY e.date, e.status;

CREATE VIEW email_count_by_sender AS
SELECT e.date, e."from", COUNT(*) AS count
FROM emails e
       JOIN settings s ON substring(e."to" from '\+(.*)@') = s.email_alias_identifier
       JOIN profiles p ON s.id = p.id
GROUP BY e.date, e."from"
ORDER BY count DESC;

CREATE VIEW recent_emails AS
SELECT e.id, e."from", e."to", e.subject, e.date, e.status, e.summary, e.received_at
FROM emails e
       JOIN settings s ON substring(e."to" from '\+(.*)@') = s.email_alias_identifier
       JOIN profiles p ON s.id = p.id
ORDER BY e.date DESC
LIMIT 10;

CREATE VIEW email_count_by_day AS
SELECT DATE(e.date) AS email_date, COUNT(*) AS count
FROM emails e
       JOIN settings s ON substring(e."to" from '\+(.*)@') = s.email_alias_identifier
       JOIN profiles p ON s.id = p.id
GROUP BY DATE(e.date)
ORDER BY email_date DESC;

CREATE VIEW email_sender_domains AS
SELECT
  e.date,
  SUBSTRING(e."from" FROM '@([^>]+)') AS domain,
  COUNT(*) AS count
FROM emails e
       JOIN settings s ON substring(e."to" from '\+(.*)@') = s.email_alias_identifier
       JOIN profiles p ON s.id = p.id
GROUP BY e.date, domain
ORDER BY count DESC;
