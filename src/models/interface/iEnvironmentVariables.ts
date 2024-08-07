/**
Object containing all environment variables.

we don't know how many environment variables will exist and
with what name.

so we use this type to have keys with type string,
holding values of any type
*/
export type IEnvironmentVariables = {
  [k in string]: any;
};
