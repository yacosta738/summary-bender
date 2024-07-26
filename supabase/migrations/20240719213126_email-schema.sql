-- Crear tipo de enumeración para el estado del correo electrónico
CREATE TYPE email_status AS ENUM ('UNPROCESSED', 'PROCESSED', 'SUMMARIZED', 'ERROR', 'SENT');

-- Crear tabla de correos electrónicos
CREATE TABLE Emails (
                      id SERIAL PRIMARY KEY,
                      "from" VARCHAR(255) NOT NULL,
                      "to" VARCHAR(255) NOT NULL,
                      subject VARCHAR(255) NOT NULL,
                      body TEXT NOT NULL,
                      date TIMESTAMP WITH TIME ZONE NOT NULL,
                      status email_status NOT NULL DEFAULT 'UNPROCESSED',
                      summary TEXT NOT NULL,
                      received_at TIMESTAMP NOT NULL
);

-- Crear tabla de estado de sincronización
CREATE TABLE SyncState (
                         id SERIAL PRIMARY KEY,
                         last_synced TIMESTAMP NOT NULL
);

-- Habilitar RLS en las tablas Emails y SyncState
ALTER TABLE Emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE SyncState ENABLE ROW LEVEL SECURITY;

-- Crear políticas de RLS para la tabla Emails
CREATE POLICY "Public emails are viewable by everyone." ON Emails
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own emails." ON Emails
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update email status and summary." ON Emails
  FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Crear políticas de RLS para la tabla SyncState
CREATE POLICY "Public sync state is viewable by everyone." ON SyncState
  FOR SELECT USING (true);

CREATE POLICY "Users can insert sync state." ON SyncState
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update sync state." ON SyncState
  FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
