import { access, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const deleteFile = async (filePath) => {
  try {
    await access(resolve(filePath));
    await rm(filePath);
    showDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      showInvalidInputError();
    } else {
      showOperationError();
    }
  }
};
