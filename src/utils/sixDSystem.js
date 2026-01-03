// src/utils/sixDSystem.js

/**
 * 6D Code System for Somalia
 * Format: XX-YY-ZZ
 * Logic: Interleaved decimal precision.
 * 
 * Precision Mapping:
 * - 2nd decimal place (0.01)  ~ 1.1km
 * - 3rd decimal place (0.001) ~ 110m
 * - 4th decimal place (0.0001)~ 11m
 */

// Helper to get a specific decimal digit as a string
const getDigit = (num, position) => {
  // Convert to string, split at dot
  const str = num.toString();
  const parts = str.split('.');
  if (parts.length < 2) return '0';
  
  // Get the decimals
  const decimals = parts[1];
  // Return the digit at position (0-based index, so position 2 is index 1)
  return decimals[position - 1] || '0';
};

/**
 * FORWARD LOGIC: Lat/Lng -> 6D Code
 */
export const generate6DCode = (lat, lng) => {
  // Ensure inputs are absolute numbers for digit extraction (handle negatives if needed, though Somalia is North/East)
  const absLat = Math.abs(lat);
  const absLng = Math.abs(lng);

  // Pair 1: 2nd Decimal (XX)
  const lat2 = getDigit(absLat, 2);
  const lng2 = getDigit(absLng, 2);
  
  // Pair 2: 3rd Decimal (YY)
  const lat3 = getDigit(absLat, 3);
  const lng3 = getDigit(absLng, 3);

  // Pair 3: 4th Decimal (ZZ)
  const lat4 = getDigit(absLat, 4);
  const lng4 = getDigit(absLng, 4);

  return `${lat2}${lng2}-${lat3}${lng3}-${lat4}${lng4}`;
};

/**
 * REVERSE LOGIC: 6D Code -> Lat/Lng (Center of Grid)
 * 
 * CRITICAL: A 6D code only contains the decimals. 
 * It requires a "Base Region" (Integer parts) to be fully resolvable.
 * For Mogadishu, we assume Base Lat: 2, Base Lng: 45.
 */
export const decode6DCode = (code, baseLat = 2, baseLng = 45) => {
  // Remove hyphens
  const cleanCode = code.replace(/-/g, '');
  
  if (cleanCode.length !== 6) return null;

  // Extract pairs
  const lat2 = cleanCode[0];
  const lng2 = cleanCode[1];
  
  const lat3 = cleanCode[2];
  const lng3 = cleanCode[3];
  
  const lat4 = cleanCode[4];
  const lng4 = cleanCode[5];

  // Reconstruct Decimals
  // We append '5' at the end to place the point in the CENTER of the 11m grid
  const latDecimal = `.${lat2}${lat3}${lat4}5`;
  const lngDecimal = `.${lng2}${lng3}${lng4}5`;

  // Combine with base integers
  const finalLat = parseFloat(`${baseLat}${latDecimal}`);
  const finalLng = parseFloat(`${baseLng}${lngDecimal}`);

  return {
    latitude: finalLat,
    longitude: finalLng,
  };
};
