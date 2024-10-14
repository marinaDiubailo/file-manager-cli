import { writeFile, access } from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { showOperationError, showDirectory } from '../../helpers/index.js';

/**
 * If a file with the provided file name already exists, an error "Operation failed" will be returned.
 * This is done to protect sensitive information from being overwritten.
 */

export const createFile = async (fileName) => {
  const filePath = resolve(cwd(), fileName);

  try {
    await access(filePath);
    showOperationError();
    return;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      showOperationError();
      return;
    }
  }

  try {
    await writeFile(filePath, '');
    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
