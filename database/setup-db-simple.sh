#!/bin/bash

# Simplified PostgreSQL Database Setup for ITC Conference
# This script creates the database and tables using psql directly

set -e

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║     PostgreSQL Database Setup - ITC Conference Registration          ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

# Configuration
DB_NAME="itc_conference"
DB_USER="itc_user"
DB_PASSWORD="itc_password_2026"
DB_HOST="localhost"
DB_PORT="5432"

echo "Database Configuration:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This script will create:"
echo "  1. PostgreSQL database '$DB_NAME'"
echo "  2. Database user '$DB_USER'"
echo "  3. Tables for users and registrations"
echo ""
echo "You will be prompted for your sudo password to run PostgreSQL commands."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

# Create database and user
echo "Step 1: Creating database and user..."
sudo -u postgres psql << EOF
-- Create user if not exists
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$DB_USER') THEN
    CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
  END IF;
END
\$\$;

-- Create database if not exists
SELECT 'CREATE DATABASE $DB_NAME'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

echo "✓ Database and user created"
echo ""

# Create tables
echo "Step 2: Creating tables..."
sudo -u postgres psql -d "$DB_NAME" << 'EOF'
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

-- Create indexes
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

-- Create triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_registrations_updated_at ON registrations;
CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Display success
SELECT 'Tables created successfully!' as status;
EOF

echo "✓ Tables created"
echo ""

# Grant permissions
echo "Step 3: Granting permissions..."
sudo -u postgres psql -d "$DB_NAME" << EOF
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;
EOF

echo "✓ Permissions granted"
echo ""

# Update .env.local
echo "Step 4: Updating environment configuration..."
DB_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

if [ -f ".env.local" ]; then
    if grep -q "DATABASE_URL=" .env.local; then
        sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=$DB_URL|" .env.local
        echo "✓ Updated DATABASE_URL in .env.local"
    else
        echo "" >> .env.local
        echo "# PostgreSQL Database Configuration" >> .env.local
        echo "DATABASE_URL=$DB_URL" >> .env.local
        echo "NEXT_PUBLIC_USE_LOCAL_API=true" >> .env.local
        echo "✓ Added DATABASE_URL to .env.local"
    fi
else
    cat > .env.local << ENVEOF
# PostgreSQL Database Configuration
DATABASE_URL=$DB_URL
NEXT_PUBLIC_USE_LOCAL_API=true

# Firebase Admin SDK (for API routes)
FIREBASE_PROJECT_ID=itc--2026
FIREBASE_CLIENT_EMAIL=your-client-email@itc--2026.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=your-private-key-here
ENVEOF
    echo "✓ Created .env.local with DATABASE_URL"
fi
echo ""

# Verify tables
echo "Step 5: Verifying database setup..."
TABLE_COUNT=$(sudo -u postgres psql -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
echo "✓ Found $TABLE_COUNT tables in database"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Database Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Database Connection Details:"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Password: $DB_PASSWORD"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo ""
echo "Connection String (added to .env.local):"
echo "  $DB_URL"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Test the database connection:"
echo "   PGPASSWORD='$DB_PASSWORD' psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c '\dt'"
echo ""
echo "2. View the tables:"
echo "   PGPASSWORD='$DB_PASSWORD' psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c 'SELECT * FROM users;'"
echo ""
echo "3. Your Next.js app is now configured to use PostgreSQL"
echo "   The DATABASE_URL has been added to .env.local"
echo ""
echo "4. Start your development server:"
echo "   npm run dev"
echo ""
echo "5. Test registration submission at:"
echo "   http://localhost:3000/fellowship/register"
echo ""
echo "6. View registrations in database:"
echo "   PGPASSWORD='$DB_PASSWORD' psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c 'SELECT * FROM registrations;'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Setup complete! Your database is ready to accept registrations."
echo ""
