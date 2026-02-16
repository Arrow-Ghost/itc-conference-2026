// PostgreSQL Database Connection Utility
import { Pool, PoolClient, QueryResult } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Test connection on startup
pool.on("connect", () => {
  console.log("✓ Connected to PostgreSQL database");
});

/**
 * Execute a query with parameters
 */
export async function query(
  text: string,
  params?: unknown[],
): Promise<QueryResult> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  return client;
}

/**
 * Close all connections in the pool
 */
export async function closePool(): Promise<void> {
  await pool.end();
  console.log("Database pool closed");
}

// User database operations
export const UserDB = {
  /**
   * Create or update a user
   */
  async upsert(userData: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    provider?: string;
  }) {
    const { uid, email, displayName, photoURL, provider = "google" } = userData;

    const result = await query(
      `INSERT INTO users (uid, email, display_name, photo_url, provider, last_login)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (uid)
       DO UPDATE SET
         email = EXCLUDED.email,
         display_name = EXCLUDED.display_name,
         photo_url = EXCLUDED.photo_url,
         last_login = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [uid, email, displayName, photoURL, provider],
    );

    return result.rows[0];
  },

  /**
   * Find user by UID
   */
  async findByUid(uid: string) {
    const result = await query("SELECT * FROM users WHERE uid = $1", [uid]);
    return result.rows[0] || null;
  },

  /**
   * Find user by email
   */
  async findByEmail(email: string) {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  },
};

// Registration database operations
export const RegistrationDB = {
  /**
   * Create a new registration
   */
  async create(registrationData: {
    uid: string;
    name: string;
    email: string;
    phone: string;
    institution: string;
    department: string;
    year: string;
    registrationType: string;
    additionalInfo?: string;
  }) {
    const {
      uid,
      name,
      email,
      phone,
      institution,
      department,
      year,
      registrationType,
      additionalInfo,
    } = registrationData;

    // First, get the user_id from users table
    const userResult = await query("SELECT id FROM users WHERE uid = $1", [
      uid,
    ]);
    const userId = userResult.rows[0]?.id;

    const result = await query(
      `INSERT INTO registrations (user_id, uid, name, email, phone, institution, department, year, registration_type, additional_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        userId,
        uid,
        name,
        email,
        phone,
        institution,
        department,
        year,
        registrationType,
        additionalInfo,
      ],
    );

    return result.rows[0];
  },

  /**
   * Find registration by user UID and type
   */
  async findByUidAndType(uid: string, registrationType?: string) {
    let queryText = "SELECT * FROM registrations WHERE uid = $1";
    const params: unknown[] = [uid];

    if (registrationType) {
      queryText += " AND registration_type = $2";
      params.push(registrationType);
    }

    queryText += " ORDER BY created_at DESC";

    const result = await query(queryText, params);
    return registrationType ? result.rows[0] || null : result.rows;
  },

  /**
   * Find registration by ID
   */
  async findById(id: number) {
    const result = await query("SELECT * FROM registrations WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  },

  /**
   * Update a registration
   */
  async update(
    id: number,
    uid: string,
    updateData: {
      name?: string;
      email?: string;
      phone?: string;
      institution?: string;
      department?: string;
      year?: string;
      additionalInfo?: string;
    },
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        // Convert camelCase to snake_case
        const snakeKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`,
        );
        fields.push(`${snakeKey} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(id, uid);

    const result = await query(
      `UPDATE registrations
       SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${paramCount} AND uid = $${paramCount + 1}
       RETURNING *`,
      values,
    );

    return result.rows[0] || null;
  },

  /**
   * Delete a registration
   */
  async delete(id: number, uid: string) {
    const result = await query(
      "DELETE FROM registrations WHERE id = $1 AND uid = $2 RETURNING *",
      [id, uid],
    );
    return result.rows[0] || null;
  },

  /**
   * Get all registrations (admin)
   */
  async getAll(filters?: {
    registrationType?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    let queryText = "SELECT * FROM registrations WHERE 1=1";
    const params: unknown[] = [];
    let paramCount = 1;

    if (filters?.registrationType) {
      queryText += ` AND registration_type = $${paramCount}`;
      params.push(filters.registrationType);
      paramCount++;
    }

    if (filters?.status) {
      queryText += ` AND status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    queryText += " ORDER BY created_at DESC";

    if (filters?.limit) {
      queryText += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
      paramCount++;
    }

    if (filters?.offset) {
      queryText += ` OFFSET $${paramCount}`;
      params.push(filters.offset);
    }

    const result = await query(queryText, params);
    return result.rows;
  },

  /**
   * Get registration statistics
   */
  async getStats() {
    const result = await query(`
      SELECT
        registration_type,
        COUNT(*) as count,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
      FROM registrations
      GROUP BY registration_type
    `);

    return result.rows;
  },
};

// Export pool for advanced usage
export default pool;
