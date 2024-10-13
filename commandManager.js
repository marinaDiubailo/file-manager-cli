import { fs } from './modules/fs/fs.js';
import { getOsInfo } from './modules/os/getOsInfo.js';
import { nwd } from './modules/nwd/nwd.js';
import { calculateHash } from './modules/hash/calcHash.js';
import { getList } from './modules/ls/getList.js';
import { showInvalidInputError } from './helpers/showInvalidInputError.js';

export const commandManager = async (command) => {
  const [commandKey, ...value] = command;

  if (commandKey in fs) {
    await fs[commandKey](...value);
  } else if (commandKey === 'os') {
    getOsInfo(...value);
  } else if (commandKey === 'hash') {
    await calculateHash(...value);
  } else if (commandKey === 'ls') {
    await getList();
  } else if (commandKey in nwd) {
    await nwd[commandKey](...value);
  } else {
    showInvalidInputError();
  }
};
