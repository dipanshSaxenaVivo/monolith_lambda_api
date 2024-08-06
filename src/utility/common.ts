/**
 * Checks if an object contains the specified fields.
 * 
 * This function verifies whether all specified fields are present in the object.
 * 
 * @param {object} obj - The object to be checked.
 * @param {...string} fields - The fields to check for. Can be a single string, multiple strings, or an array of strings.
 * @returns {string[]} - An array of missing field names. Returns an empty array if all specified fields are present.
 * 
 * @example
 * const missingFields = hasRequiredFields(event.body, 'email', 'name');
 * // returns [] if event.body has both 'email' and 'name' fields
 * 
 * const missingFields = hasRequiredFields(event.body, 'email', 'age');
 * // returns ['age'] if 'age' is not present in event.body
 */
export function hasRequiredFields<T extends object, K extends keyof T>(
  obj: T,
  ...fields: K[]
): string[] {
  const flatFields = fields.flat();
  return flatFields.reduce((acc: any[], current) => {
    if (obj.hasOwnProperty(current)) {
      return acc;
    } else {
      acc.push(current);
      return acc;
    }
  }, []);
}


/**
 * Extracts the numeric values from an enum object.

 * @template T - The type of the enum object, which must be a record of number-to-string pairs.
 * @param {T} enumObject - The enum object to extract values from.
 * @returns {number[]} An array of numeric values from the enum.
 */
export const getAllKeysFromEnum = <T extends Record<number, string>>(enumObject: T): number[] => {
  return Object.values(enumObject).filter(value => typeof value === 'number');
};

/**
 * Extracts the string values from an enum object.

 * @template T - The type of the enum object, which must be a record of number-to-string pairs.
 * @param {T} enumObject - The enum object to extract values from.
 * @returns {string[]} An array of numeric values from the enum.
 */
export const getAllValuesFromEnum = <T extends Record<number, string>>(enumObject: T): string[] => {
  return Object.values(enumObject).filter(value => typeof value === 'string');
};