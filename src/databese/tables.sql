// invitations

CREATE TABLE IF NOT EXISTS invitations (
  id SERIAL PRIMARY KEY,
  eventId UUID NOT NULL,
  userId UUID NOT NULL,
  status VARCHAR(10) CHECK (status IN ('accept', 'maybe', 'no', 'busy')) NOT NULL,
  qrCode TEXT NOT NULL,
  isCheckIn BOOLEAN DEFAULT FALSE,
  checkInAt TIMESTAMP,
);

ALTER TABLE invitations ADD COLUMN gift VARCHAR(255);
