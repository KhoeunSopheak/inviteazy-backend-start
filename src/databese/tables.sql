// invitations

CREATE TABLE IF NOT EXISTS invitations (
  id SERIAL PRIMARY KEY,
  event_id UUID NOT NULL,
  invitee_id UUID NOT NULL,
  status VARCHAR(10) CHECK (status IN ('accept', 'maybe', 'no', 'busy')) NOT NULL,
  qr_code TEXT NOT NULL,
  is_check_in BOOLEAN DEFAULT FALSE,
  check_in_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_out_at TIMESTAMP,
  gift VARCHAR(255),
);

ALTER TABLE invitations ADD COLUMN gift VARCHAR(255);
ALTER TABLE invitations
ADD COLUMN is_check_out BOOLEAN DEFAULT FALSE,
ADD COLUMN check_out_at TIMESTAMP;

CREATE TABLE IF NOT EXISTS invitations (
  id SERIAL PRIMARY KEY,
  event_id UUID NOT NULL,
  invitee_id UUID NOT NULL,
  status VARCHAR(10) CHECK (status IN ('accept', 'maybe', 'no', 'busy')) NOT NULL,
  qr_code TEXT NOT NULL,
  is_check_in BOOLEAN DEFAULT FALSE,
  check_in_at TIMESTAMP,
  is_check_out BOOLEAN DEFAULT FALSE,
  check_out_at TIMESTAMP,
  gift VARCHAR(255),
);

