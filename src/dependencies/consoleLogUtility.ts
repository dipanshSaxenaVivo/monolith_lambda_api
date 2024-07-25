import { IDependencyContainer, ILogger } from "models/interface";
console.log('console log utility')

const log = (...args: any[]) => {
  console.log(...args);
};

const error = (...args: any[]) => {
  console.error(...args);
};

const info = (...args: any[]) => {
  console.info(...args);
};

const warn = (...args: any[]) => {
  console.warn(...args);
};

const console_logger: ILogger = {
  log,
  error,
  info,
  warn,
};

/**
 * apply console log dependency to the provided dependency container
 * @param {Omit<IDependencyContainer, "logger">} DC
 * @returns {IDependencyContainer}
 */
export const apply_console_logger = (
  DC: Omit<IDependencyContainer, "logger">
): IDependencyContainer => {
  return { ...DC, logger: console_logger };
};
