#!/bin/bash

# PostgreSQL Database Initialization Script for ITC Conference
# This script sets up the database, user, and tables

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

# Check if PostgreSQL is running
echo "Step 1: Checking PostgreSQL status..."
if systemctl is-active --quiet postgresql; then
    echo "✓ PostgreSQL is running"
else
    echo "✗ PostgreSQL is not running"
    echo "Starting PostgreSQL..."
    sudo systemctl start postgresql
    echo "✓ PostgreSQL started"
fi
echo ""

# Check if database already exists
echo "Step 2: Checking if database exists..."
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "⚠️  Database '$DB_NAME' already exists"
    read -p "Do you want to drop and recreate it? (y/N): " confirm
    if [[ $confirm =~ ^[Yy]$ ]]; then
        echo "Dropping existing database..."
        sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
        echo "✓ Database dropped"
    else
        echo "Keeping existing database"
    fi
fi
echo ""

# Create database if it doesn't exist
echo "Step 3: Creating database..."
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
    sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
echo "✓ Database '$DB_NAME' created"
echo ""

# Create user if it doesn't exist
echo "Step 4: Creating database user..."
sudo -u postgres psql -tc "SELECT 1 FROM pg_user WHERE usename = '$DB_USER'" | grep -q 1 || \
    sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
echo "✓ User '$DB_USER' created"
echo ""

# Grant privileges
echo "Step 5: Granting privileges..."
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -d "$DB_NAME" -c "GRANT ALL ON SCHEMA public TO $DB_USER;"
sudo -u postgres psql -d "$DB_NAME" -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;"
sudo -u postgres psql -d "$DB_NAME" -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;"
sudo -u postgres psql -d "$DB_NAME" -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;"
sudo -u postgres psql -d "$DB_NAME" -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;"
echo "✓ Privileges granted"
echo ""

# Run setup SQL
echo "Step 6: Creating tables and schemas..."
if [ -f "database/setup.sql" ]; then
    sudo -u postgres psql -d "$DB_NAME" -f database/setup.sql
    echo "✓ Tables and schemas created"
else
    echo "⚠️  Warning: setup.sql not found, creating tables manually..."

    sudo -u postgres psql -d "$DB_NAME" << EOF
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

-- Grant permissions to user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;

-- Display success
SELECT 'Tables created successfully!' as status;
EOF

    echo "✓ Tables created"
fi
echo ""

# Verify setup
echo "Step 7: Verifying database setup..."
TABLES=$(sudo -u postgres psql -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
echo "✓ Found $TABLES tables in database"
echo ""

# Create .env.local entry
echo "Step 8: Updating environment configuration..."
DB_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

if [ -f ".env.local" ]; then
    # Check if DATABASE_URL already exists
    if grep -q "DATABASE_URL=" .env.local; then
        # Update existing entry
        sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=$DB_URL|" .env.local
        echo "✓ Updated DATABASE_URL in .env.local"
    else
        # Add new entry
        echo "" >> .env.local
        echo "# PostgreSQL Database Configuration" >> .env.local
        echo "DATABASE_URL=$DB_URL" >> .env.local
        echo "✓ Added DATABASE_URL to .env.local"
    fi
else
    echo "⚠️  .env.local not found, creating it..."
    cat > .env.local << EOF
# PostgreSQL Database Configuration
DATABASE_URL=$DB_URL

# Add your Firebase configuration here
EOF
    echo "✓ Created .env.local with DATABASE_URL"
fi
echo ""

# Display connection info
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
echo "Connection String:"
echo "  $DB_URL"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test connection
echo "Testing database connection..."
if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" > /dev/null 2>&1; then
    echo "✓ Connection test successful!"
else
    echo "✗ Connection test failed!"
    echo "  Please check your database configuration"
fi
echo ""

echo "Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Install Node.js PostgreSQL client:"
echo "   npm install pg"
echo ""
echo "2. The DATABASE_URL has been added to .env.local"
echo ""
echo "3. Your backend API can now connect to PostgreSQL"
echo ""
echo "4. To connect manually:"
echo "   psql -h $DB_HOST -U $DB_USER -d $DB_NAME"
echo "   (Password: $DB_PASSWORD)"
echo ""
echo "5. To view tables:"
echo "   psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c '\dt'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Setup complete! Your database is ready to use."
echo ""
