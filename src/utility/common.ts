/**
 * Checks if an object contains the specified fields.
 * 
 * @param {object} obj - The object to be checked.
 * @param {...string | string[]} fields - The fields to check for. 
 * Can be a single string, multiple strings, or an array of strings.
 * @returns {boolean} - Returns true if all specified fields are present, otherwise false.
 * 
 * @example
 * const hasFields = hasRequiredFields(event.body, 'email', 'name');
 * returns true if event.body has both 'email' and 'name' fields
 */
export function hasRequiredFields(obj: object, ...fields: (string | string[])[]): boolean {
  const flatFields = fields.flat();
  return flatFields.every(field => obj.hasOwnProperty(field));
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