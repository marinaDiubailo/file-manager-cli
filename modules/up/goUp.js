import { chdir, cwd } from 'node:process';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { showOperationError, showDirectory } from '../../helpers/index.js';

export const goUp = async () => {
  try {
    const newPath = resolve(cwd(), '..');

    await access(newPath);
    chdir(newPath);
    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
