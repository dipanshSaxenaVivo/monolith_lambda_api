export interface ILogger {
  /**
   * Logs a message.
   *
   * @param {...any[]} args - Arguments to be logged.
   */
  log: (...args: any[]) => void;

  /**
   * Logs an error message.
   *
   * @param {...any[]} args - Arguments to be logged.
   */
  error: (...args: any[]) => void;

  /**
   * Logs an informational message.
   *
   * @param {...any[]} args - Arguments to be logged.
   */
  info: (...args: any[]) => void;

  /**
   * Logs a warning message.
   *
   * @param {...any[]} args - Arguments to be logged.
   */
  warn: (...args: any[]) => void;
}