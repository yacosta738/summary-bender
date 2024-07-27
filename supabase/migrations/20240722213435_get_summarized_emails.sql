CREATE OR REPLACE FUNCTION get_summarized_emails()
  RETURNS TABLE
          (
            id                     INT4,
            "from"                 VARCHAR(255),
            "to"                   VARCHAR(255),
            subject                VARCHAR(255),
            body                   TEXT,
            date                   TIMESTAMP WITH TIME ZONE,
            status                 email_status,
            summary                TEXT,
            received_at            TIMESTAMP,
            email_alias_identifier TEXT,
            notifications_enabled   BOOLEAN,
            user_email             TEXT
          )
AS
$$
BEGIN
  RETURN QUERY
    -- Consulta para extraer alias y recuperar emails con estatus SUMMARIZED
    SELECT e.id,
           e."from",
           e."to",
           e.subject,
           e.body,
           e.date,
           e.status,
           e.summary,
           e.received_at,
           s.email_alias_identifier,
           s.notifications_enabled,
           p.email AS user_email
    FROM emails e
           JOIN
         settings s ON substring(e."to" from '\+(.*)@') = s.email_alias_identifier
           JOIN
         profiles p ON s.id = p.id
    WHERE e.status = 'SUMMARIZED'
    AND s.notifications_enabled = TRUE
    ORDER BY e.date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
