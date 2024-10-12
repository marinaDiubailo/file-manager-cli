import { access, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  showInvalidInputError,
  showOperationError,
} from '../../helpers/index.js';
import { copyFile } from './copyFile.js';

export const moveFile = async (sourcePath, destDirectory) => {
  try {
    await access(resolve(sourcePath));
    await access(resolve(destDirectory));
    await copyFile(sourcePath, destDirectory);
    await rm(sourcePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      showInvalidInputError();
    } else {
      showOperationError();
    }
  }
};
