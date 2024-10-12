import { fs } from './modules/fs/fs.js';
import { getOsInfo } from './modules/os/getOsInfo.js';
import { showInvalidInputError } from './helpers/showInvalidInputError.js';

export const commandManager = async (command) => {
  const [commandKey, ...value] = command;

  if (commandKey in fs) {
    await fs[commandKey](...value);
  } else if (commandKey === 'os') {
    getOsInfo(...value);
  } else {
    showInvalidInputError();
  }
};
