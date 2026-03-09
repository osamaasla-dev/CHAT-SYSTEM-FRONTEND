const isDevEnvironment = import.meta.env.DEV;

export const devLog = (...args: unknown[]) => {
  if (!isDevEnvironment) {
    return;
  }

  console.log(...args);
};

export const devWarn = (...args: unknown[]) => {
  if (!isDevEnvironment) {
    return;
  }

  console.warn(...args);
};

export const devError = (...args: unknown[]) => {
  if (!isDevEnvironment) {
    return;
  }

  console.error(...args);
};
