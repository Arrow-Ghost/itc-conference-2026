# PostgreSQL Database Setup Guide

## 🎯 Overview

This guide will help you set up a local PostgreSQL database to store conference registrations instead of using Firebase Firestore.

## 📋 Prerequisites

- PostgreSQL installed and running (already installed on your system ✓)
- Sudo access to run PostgreSQL commands
- Node.js and npm installed

## 🚀 Quick Setup (Automated)

### Option 1: Run the Setup Script (Recommended)

```bash
cd /home/krxsna/dev/itc-new
./database/setup-db-simple.sh
```

The script will:
1. Create a database called `itc_conference`
2. Create a user `itc_user` with password `itc_password_2026`
3. Create `users` and `registrations` tables
4. Set up indexes and triggers
5. Update your `.env.local` with the database connection string

You'll be prompted for your sudo password once.

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
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
```

### Registrations Table
```sql
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    uid VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    registration_type VARCHAR(50) NOT NULL,
    additional_info TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_registration UNIQUE(uid, registration_type)
);
```

## 🔧 Manual Setup (Alternative)

If you prefer to set up manually:

### Step 1: Connect to PostgreSQL
```bash
sudo -u postgres psql
```

### Step 2: Create Database and User
```sql
CREATE DATABASE itc_conference;
CREATE USER itc_user WITH PASSWORD 'itc_password_2026';
GRANT ALL PRIVILEGES ON DATABASE itc_conference TO itc_user;
\c itc_conference
GRANT ALL ON SCHEMA public TO itc_user;
\q
```

### Step 3: Create Tables
```bash
sudo -u postgres psql -d itc_conference -f database/setup.sql
```

### Step 4: Update .env.local
Add this to your `.env.local` file:

```env
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://itc_user:itc_password_2026@localhost:5432/itc_conference
NEXT_PUBLIC_USE_LOCAL_API=true

# Firebase Admin SDK (for token verification)
FIREBASE_PROJECT_ID=itc--2026
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@itc--2026.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"
```

## 🔑 Firebase Admin SDK Setup

The API routes need Firebase Admin SDK credentials to verify authentication tokens.

### Get Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `itc--2026`
3. Click ⚙️ → Project Settings → Service Accounts
4. Click "Generate new private key"
5. A JSON file will be downloaded

### Add to .env.local

From the downloaded JSON file, copy:
- `project_id` → `FIREBASE_PROJECT_ID`
- `client_email` → `FIREBASE_CLIENT_EMAIL`
- `private_key` → `FIREBASE_PRIVATE_KEY`

**Important:** The private key must keep the `\n` characters. Don't remove them!

```env
FIREBASE_PROJECT_ID=itc--2026
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@itc--2026.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...\n-----END PRIVATE KEY-----\n"
```

## ✅ Verify Setup

### Test Database Connection
```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference -c '\dt'
```

You should see:
```
             List of relations
 Schema |       Name       | Type  |  Owner
--------+------------------+-------+----------
 public | registrations    | table | postgres
 public | users            | table | postgres
```

### Check Tables Are Empty
```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference -c 'SELECT COUNT(*) FROM users;'
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference -c 'SELECT COUNT(*) FROM registrations;'
```

## 🧪 Test the Integration

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Go to Registration Page
Open: http://localhost:3000/fellowship/register

### 3. Sign In and Submit
- Sign in with Google
- Fill out the registration form
- Submit

### 4. Verify Data in Database
```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference
```

Then run:
```sql
-- View users
SELECT * FROM users;

-- View registrations
SELECT * FROM registrations;

-- Count registrations by type
SELECT registration_type, COUNT(*) 
FROM registrations 
GROUP BY registration_type;

-- View registration details with user info
SELECT r.*, u.display_name 
FROM registrations r 
JOIN users u ON r.uid = u.uid;
```

## 📁 Project Structure

```
itc-new/
├── database/
│   ├── setup.sql              # SQL schema definition
│   ├── setup-db-simple.sh     # Automated setup script
│   └── init-db.sh             # Alternative setup script
├── lib/
│   ├── db.ts                  # PostgreSQL connection utility
│   └── api.ts                 # Updated to use local API
├── app/api/
│   └── registrations/
│       └── route.ts           # API route for registrations
└── .env.local                 # Database connection string
```

## 🔍 Useful Database Commands

### Connect to Database
```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference
```

### View All Tables
```sql
\dt
```

### Describe Table Structure
```sql
\d users
\d registrations
```

### View Recent Registrations
```sql
SELECT id, name, email, registration_type, created_at 
FROM registrations 
ORDER BY created_at DESC 
LIMIT 10;
```

### Count Users and Registrations
```sql
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM registrations) as total_registrations;
```

### Search by Email
```sql
SELECT * FROM registrations WHERE email LIKE '%@university.edu';
```

### Filter by Registration Type
```sql
SELECT * FROM registrations WHERE registration_type = 'fellowship';
```

### Delete a Registration (by ID)
```sql
DELETE FROM registrations WHERE id = 1;
```

### Clear All Data (but keep tables)
```sql
TRUNCATE TABLE registrations CASCADE;
TRUNCATE TABLE users CASCADE;
```

## 🔐 Security Notes

### Change Default Password

For production, change the default password:

```sql
ALTER USER itc_user WITH PASSWORD 'your-secure-password';
```

Then update `.env.local` with the new password.

### Environment Variables

- ✅ `.env.local` is in `.gitignore` (safe)
- ⚠️ Never commit database credentials to Git
- 🔒 Use strong passwords in production
- 🔐 Use SSL connections for remote databases

## 🐛 Troubleshooting

### Error: "relation does not exist"
**Solution:** Tables weren't created. Run the setup script again.

### Error: "password authentication failed"
**Solution:** Check your DATABASE_URL in `.env.local` has the correct password.

### Error: "connection refused"
**Solution:** PostgreSQL isn't running. Start it:
```bash
sudo systemctl start postgresql
```

### Error: "permission denied for schema public"
**Solution:** Grant permissions:
```bash
sudo -u postgres psql -d itc_conference -c "GRANT ALL ON SCHEMA public TO itc_user;"
```

### Can't Connect from Node.js
**Solution:** Make sure `pg` package is installed:
```bash
npm install pg @types/pg
```

## 📊 Database Monitoring

### Check Database Size
```sql
SELECT pg_size_pretty(pg_database_size('itc_conference'));
```

### Check Table Sizes
```sql
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Active Connections
```sql
SELECT * FROM pg_stat_activity WHERE datname = 'itc_conference';
```

## 🔄 Backup and Restore

### Backup Database
```bash
PGPASSWORD='itc_password_2026' pg_dump -h localhost -U itc_user itc_conference > backup.sql
```

### Restore Database
```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user itc_conference < backup.sql
```

### Backup to CSV
```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference -c "COPY registrations TO STDOUT WITH CSV HEADER" > registrations.csv
```

## 🎉 Success Checklist

- [ ] PostgreSQL is running
- [ ] Database `itc_conference` created
- [ ] User `itc_user` created
- [ ] Tables `users` and `registrations` exist
- [ ] DATABASE_URL added to `.env.local`
- [ ] NEXT_PUBLIC_USE_LOCAL_API=true in `.env.local`
- [ ] Firebase Admin SDK credentials in `.env.local`
- [ ] `npm install pg @types/pg` completed
- [ ] Dev server starts without errors
- [ ] Can submit registration from web form
- [ ] Data appears in database

## 📞 Need Help?

If you encounter issues:

1. Check PostgreSQL is running: `systemctl status postgresql`
2. Verify database exists: `sudo -u postgres psql -l | grep itc_conference`
3. Check tables exist: Use the verify commands above
4. Review server logs: Check terminal where `npm run dev` is running
5. Check database logs: `sudo tail -f /var/log/postgresql/postgresql-*.log`

---

**Setup Script:** `./database/setup-db-simple.sh`  
**Connection Test:** `PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference`  
**Status:** ✅ Ready to store registrations locally!