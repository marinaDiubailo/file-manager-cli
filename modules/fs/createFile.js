import { writeFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { showOperationError, showDirectory } from '../../helpers/index.js';

export const createFile = async (fileName) => {
  try {
    const filePath = resolve(cwd(), fileName);

    await writeFile(filePath, '');
    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
