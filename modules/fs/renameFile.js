import { access, rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

/**
 * If the new file name is the same as the current file name,
 * no error will be raised.
 *
 * If the new file name already exists in the current directory,
 * an error "Operation failed" will be returned,
 * to prevent overwriting existing files.
 */

export const renameFile = async (pathToFile, newFileName) => {
  if (!pathToFile || !newFileName) {
    showInvalidInputError();
    return;
  }

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
      showOperationError();
      return;
    } catch {}

    await rename(resolvedOldPath, resolvedNewPath);
    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
