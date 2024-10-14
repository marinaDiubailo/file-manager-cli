import { fs } from './modules/fs/fs.js';
import { zip } from './modules/zip/zip.js';
import { changeDirectory } from './modules/cd/changeDirectory.js';
import { goUp } from './modules/up/goUp.js';
import { calculateHash } from './modules/hash/calcHash.js';
import { getOsInfo } from './modules/os/getOsInfo.js';
import { getList } from './modules/ls/getList.js';
import { showInvalidInputError } from './helpers/showInvalidInputError.js';

export const commandManager = async (command) => {
  const [commandKey, ...value] = command;

  if (commandKey === 'os') {
    getOsInfo(...value);
  } else if (commandKey === 'hash') {
    await calculateHash(...value);
  } else if (commandKey === 'ls') {
    await getList();
  } else if (commandKey === 'up') {
    await goUp();
  } else if (commandKey === 'cd') {
    await changeDirectory(...value);
  } else if (commandKey in fs) {
    await fs[commandKey](...value);
  } else if (commandKey in zip) {
    await zip[commandKey](...value);
  } else {
    showInvalidInputError();
  }
};
