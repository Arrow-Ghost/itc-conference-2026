
/**
 * Strip leading/trailing whitespace and collapse internal runs of whitespace.
 * Also removes common XSS characters: < > " ' ` ; ( ) { }
 */
export function sanitize(value: string): string {
  return value
    .trim()
    .replace(/[<>"'`;(){}]/g, "")
    .replace(/\s+/g, " ");
}


export function sanitizeFields<T extends Record<string, unknown>>(obj: T): T {
  const cleaned = { ...obj };
  for (const key in cleaned) {
    if (typeof cleaned[key] === "string") {
      (cleaned as Record<string, unknown>)[key] = sanitize(
        cleaned[key] as string,
      );
    }
  }
  return cleaned;
}


const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_INSTITUTION = 300;
const MAX_DEPARTMENT = 200;
const MAX_CITY = 100;
const MAX_STATE = 100;
const MAX_ADDITIONAL_INFO = 2000;

/**
 * Validates an institutional email address.
 * Must end with .edu or contain .ac. in the domain portion.
 */
export function isValidInstitutionalEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return false;

  const domain = trimmed.split("@")[1];
  if (!domain) return false;

  return domain.endsWith(".edu") || domain.includes(".ac.");
}

/**
 * Validates a phone number (digits, spaces, dashes, plus sign, parens).
 * Must have between 7 and 20 characters after stripping non-digit chars.
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  if (!/^\d+$/.test(cleaned)) return false;
  return cleaned.length >= 7 && cleaned.length <= 15;
}


export interface RegistrationFields {
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  city?: string;
  state?: string;
  additionalInfo?: string;
}

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

const VALID_YEARS = [
  "1",
  "2",
  "3",
  "4",
  "masters",
  "phd",
  "postdoc",
  "faculty",
  // fellowship/application uses these variants
  "Undergraduate - 1st Year",
  "Undergraduate - 2nd Year",
  "Undergraduate - 3rd Year",
  "Undergraduate - 4th Year",
  "Master's Student",
  "PhD Student",
  "Postdoc",
  "Faculty",
  "Other",
];


export function validateRegistration(
  fields: RegistrationFields,
): ValidationResult {
  const { name, email, phone, institution, department, year } = fields;

  if (!name.trim()) return { valid: false, error: "Full name is required." };
  if (!email.trim()) return { valid: false, error: "Email is required." };
  if (!phone.trim()) return { valid: false, error: "Phone number is required." };
  if (!institution.trim())
    return { valid: false, error: "Institution is required." };
  if (!department.trim())
    return { valid: false, error: "Department is required." };
  if (!year.trim()) return { valid: false, error: "Year of study is required." };

  if (name.trim().length > MAX_NAME)
    return { valid: false, error: `Name must be under ${MAX_NAME} characters.` };
  if (email.trim().length > MAX_EMAIL)
    return { valid: false, error: `Email must be under ${MAX_EMAIL} characters.` };
  if (phone.trim().length > MAX_PHONE)
    return { valid: false, error: `Phone must be under ${MAX_PHONE} characters.` };
  if (institution.trim().length > MAX_INSTITUTION)
    return {
      valid: false,
      error: `Institution must be under ${MAX_INSTITUTION} characters.`,
    };
  if (department.trim().length > MAX_DEPARTMENT)
    return {
      valid: false,
      error: `Department must be under ${MAX_DEPARTMENT} characters.`,
    };
  if (fields.city && fields.city.trim().length > MAX_CITY)
    return { valid: false, error: `City must be under ${MAX_CITY} characters.` };
  if (fields.state && fields.state.trim().length > MAX_STATE)
    return {
      valid: false,
      error: `State must be under ${MAX_STATE} characters.`,
    };
  if (
    fields.additionalInfo &&
    fields.additionalInfo.trim().length > MAX_ADDITIONAL_INFO
  )
    return {
      valid: false,
      error: `Additional info must be under ${MAX_ADDITIONAL_INFO} characters.`,
    };

  if (!isValidInstitutionalEmail(email))
    return {
      valid: false,
      error:
        "Please use a valid institutional email address (ending in .edu or containing .ac.)",
    };

  if (!isValidPhone(phone))
    return {
      valid: false,
      error:
        "Please enter a valid phone number (7–15 digits, may include +, -, spaces).",
    };

  if (!VALID_YEARS.includes(year.trim()))
    return { valid: false, error: "Please select a valid year of study." };

  return { valid: true, error: null };
}
