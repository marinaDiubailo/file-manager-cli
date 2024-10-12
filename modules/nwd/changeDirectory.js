import { cwd, chdir } from 'node:process';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { showInvalidInputError, showDirectory } from '../../helpers/index.js';

export const changeDirectory = async (path) => {
  try {
    const newPath = resolve(path);
    await access(newPath);

    if (newPath === cwd()) return;

    chdir(newPath);
    showDirectory();
  } catch (err) {
    showInvalidInputError();
  }
};
