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

export const getAllKeysFromEnum = (enumObject: any): number[] => {
  return Object.keys(enumObject)
  .filter((key) => !isNaN(Number(enumObject[key])))
  .map((key) => Number(enumObject[key]));
};