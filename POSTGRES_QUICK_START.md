# PostgreSQL Quick Start - 5 Minutes

## 🚀 Setup in 3 Commands

```bash
# 1. Run setup script (will ask for sudo password once)
./database/setup-db-simple.sh

# 2. Install Node.js PostgreSQL client (if not done)
npm install pg @types/pg

# 3. Start dev server
npm run dev
```

## ✅ Verify It's Working

```bash
# Check database exists
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference -c '\dt'

# You should see:
#  users         | table
#  registrations | table
```

## 🧪 Test Registration

1. Go to: http://localhost:3000/fellowship/register
2. Sign in with Google
3. Fill out form and submit
4. Check database:

```bash
PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference -c 'SELECT * FROM registrations;'
```

## 📝 Quick Reference

**Database:** itc_conference  
**User:** itc_user  
**Password:** itc_password_2026  
**Connection:** `postgresql://itc_user:itc_password_2026@localhost:5432/itc_conference`

**Connect:** `PGPASSWORD='itc_password_2026' psql -h localhost -U itc_user -d itc_conference`

**View Data:**
```sql
SELECT * FROM users;
SELECT * FROM registrations;
```

**Count Records:**
```sql
SELECT COUNT(*) FROM registrations;
```

**Filter by Type:**
```sql
SELECT * FROM registrations WHERE registration_type = 'fellowship';
```

## 🎯 That's It!

Your registrations are now stored in local PostgreSQL database!

For detailed docs, see: **POSTGRES_SETUP.md**
