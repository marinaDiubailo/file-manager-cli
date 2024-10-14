import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { stdout } from 'node:process';
import { resolve } from 'node:path';
import { EOL } from 'node:os';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const readFile = async (path) => {
  if (!path) {
    showInvalidInputError();
    return;
  }

  try {
    await access(resolve(path));
    const stream = createReadStream(resolve(path), { encoding: 'utf-8' });

    stream.on('data', (chunk) => {
      stdout.write(chunk);
    });

    stream.on('end', () => {
      stdout.write(EOL);
      showDirectory();
    });

    stream.on('error', (err) => {
      showOperationError();
    });
  } catch (err) {
    showOperationError();
  }
};
