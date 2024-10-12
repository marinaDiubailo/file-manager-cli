import { access, rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const renameFile = async (pathToFile, newFileName) => {
  try {
    const resolvedOldPath = resolve(pathToFile);
    const resolvedNewPath = resolve(dirname(pathToFile), newFileName);

    await access(resolvedOldPath);

    if (resolvedOldPath === resolvedNewPath) {
      showDirectory();
      return;
    }

    try {
      await access(resolvedNewPath);
      showInvalidInputError();
      return;
    } catch {}

    await rename(resolvedOldPath, resolvedNewPath);
    showDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      showInvalidInputError();
    } else {
      showOperationError();
    }
  }
};
