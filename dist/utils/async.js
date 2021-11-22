/**
 * @summary delays execution of the next statement
 * @param sec number of seconds to delay for
 */
export const sleep = (sec = 1) => new Promise((r) => setTimeout(r, sec * 1e3));
