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
