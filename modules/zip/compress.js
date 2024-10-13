import { pipeline } from 'node:stream/promises';
import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { resolve } from 'node:path';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const compress = async (sourceFilePath, compressedFilePath) => {
  try {
    const resolvedSourcePath = resolve(sourceFilePath);

    await access(resolvedSourcePath);

    await pipeline(
      createReadStream(resolvedSourcePath),
      createGzip(),
      createWriteStream(resolve(compressedFilePath)),
    );

    showDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      showInvalidInputError();
    } else {
      showOperationError();
    }
  }
};
