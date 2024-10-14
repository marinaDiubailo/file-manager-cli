import { cwd, chdir } from 'node:process';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const changeDirectory = async (path) => {
  if (!path) {
    showInvalidInputError();
    return;
  }

  try {
    const newPath = resolve(path);
    await access(newPath);

    if (newPath !== cwd()) chdir(newPath);

    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
