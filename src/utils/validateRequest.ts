/**
 * Valida que el parámetro id sea un entero positivo.
 */
const parseId = (id: string | undefined): number | null => {
  if (!id) return null;
  const parsed = Number(id);
  if (Number.isNaN(parsed) || parsed <= 0) return null;
  return parsed;
};

const parseInt = (value: string | undefined): number | null => {
  if (!value) return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) return null;
  return parsed;
};

/**
 * Valida que el parámetro name sea una cadena no vacía.
 */
const parseName = (name: string | undefined): string | null => {
  if (!name || name.trim().length === 0) return null;
  return name.trim();
};

/**
 * Valida que el parámetro email sea una cadena no vacía.
 */
const parseEmail = (email: string | undefined): string | null => {
  if (!email || email.trim().length === 0) return null;
  return email.trim();
};

/**
 * Valida que el parámetro password sea una cadena no vacía.
 */
const parsePassword = (password: string | undefined): string | null => {
  if (!password || password.trim().length === 0) return null;
  return password.trim();
};

/**
 * Valida que el parámetro phone sea una cadena no vacía.
 */
const parsePhone = (phone: string | undefined): string | null => {
  if (!phone || phone.trim().length === 0) return null;
  return phone.trim();
};

/**
 * Valida que el parámetro address sea una cadena no vacía.
 */
const parseAddress = (address: string | undefined): string | null => {
  if (!address || address.trim().length === 0) return null;
  return address.trim();
};

/**
 * Valida que el parámetro city sea una cadena no vacía.
 */
const parseCity = (city: string | undefined): string | null => {
  if (!city || city.trim().length === 0) return null;
  return city.trim();
};

/**
 * Valida que el parámetro state sea una cadena no vacía.
 */
const parseState = (state: string | undefined): string | null => {
  if (!state || state.trim().length === 0) return null;
  return state.trim();
};

/**
 * Valida que el parámetro country sea una cadena no vacía.
 */
const parseCountry = (country: string | undefined): string | null => {
  if (!country || country.trim().length === 0) return null;
  return country.trim();
};

/**
 * Valida que el parámetro zipCode sea una cadena no vacía.
 */
const parseZipCode = (zipCode: string | undefined): string | null => {
  if (!zipCode || zipCode.trim().length === 0) return null;
  return zipCode.trim();
};

export {
  parseInt,
  parseId,
  parseName,
  parseEmail,
  parsePassword,
  parsePhone,
  parseAddress,
  parseCity,
  parseState,
  parseCountry,
  parseZipCode,
};
