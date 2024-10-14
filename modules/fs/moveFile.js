import { access, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { showOperationError } from '../../helpers/showOperationError.js';
import { copyFile } from './copyFile.js';

/**
 * Moves a file from the source path to the destination directory.
 * If the source file or destination directory does not exist, or if the destination directory
 * is the same as the source directory, an error "Operation failed" will be returned.
 */

export const moveFile = async (sourcePath, destDirectory) => {
  try {
    const resolvedSourcePath = resolve(sourcePath);
    const resolvedDestDirectory = resolve(destDirectory);
    const sourceDirectory = dirname(resolvedSourcePath);

    await access(resolvedSourcePath);
    await access(resolvedDestDirectory);

    if (sourceDirectory === resolvedDestDirectory) {
      showOperationError();
      return;
    }
    await copyFile(sourcePath, destDirectory);
    await rm(sourcePath);
  } catch (err) {
    showOperationError();
  }
};
