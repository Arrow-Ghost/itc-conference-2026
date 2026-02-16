-- PostgreSQL Database Setup for ITC Conference Registration System
-- This script creates the database, tables, and initial configuration

-- Create database (run this as postgres user)
-- CREATE DATABASE itc_conference;

-- Connect to the database
-- \c itc_conference;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    photo_url TEXT,
    provider VARCHAR(50) DEFAULT 'google',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    uid VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    registration_type VARCHAR(50) NOT NULL CHECK (registration_type IN ('fellowship', 'hackathon', 'cfp', 'cft', 'art')),
    additional_info TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_registration UNIQUE(uid, registration_type)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_registrations_uid ON registrations(uid);
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_type ON registrations(registration_type);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for registration statistics
CREATE OR REPLACE VIEW registration_stats AS
SELECT
    registration_type,
    status,
    COUNT(*) as count,
    MIN(created_at) as first_registration,
    MAX(created_at) as last_registration
FROM registrations
GROUP BY registration_type, status;

-- Create view for user registrations with details
CREATE OR REPLACE VIEW user_registrations AS
SELECT
    r.id,
    r.uid,
    u.email as user_email,
    u.display_name,
    r.name,
    r.email as registration_email,
    r.phone,
    r.institution,
    r.department,
    r.year,
    r.registration_type,
    r.additional_info,
    r.status,
    r.created_at,
    r.updated_at
FROM registrations r
LEFT JOIN users u ON r.uid = u.uid;

-- Insert sample data for testing (optional - comment out for production)
-- INSERT INTO users (uid, email, display_name) VALUES
-- ('test-uid-1', 'test@example.com', 'Test User')
-- ON CONFLICT (uid) DO NOTHING;

-- Grant permissions (adjust as needed for your user)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_db_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_db_user;

-- Display table information
SELECT
    'Database setup complete!' as message,
    COUNT(*) as total_users
FROM users;

SELECT
    'Ready to accept registrations' as message,
    COUNT(*) as total_registrations
FROM registrations;
