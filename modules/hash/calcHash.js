import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';
import { EOL } from 'node:os';
const { createHash } = await import('node:crypto');
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const calculateHash = async (pathToFile) => {
  if (!pathToFile) {
    showInvalidInputError();
    return;
  }

  const resolvedPath = resolve(pathToFile);

  try {
    await access(resolvedPath);

    const stream = createReadStream(resolvedPath);
    const hash = createHash('sha256');

    await pipeline(stream, hash);

    const result = hash.digest('hex');

    stdout.write(result + EOL);
    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
