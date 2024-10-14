import { pipeline } from 'node:stream/promises';
import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { resolve } from 'node:path';
import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const decompress = async (sourceFilePath, decompressedFilePath) => {
  if (!sourceFilePath || !decompressedFilePath) {
    showInvalidInputError();
    return;
  }

  try {
    const resolvedSourcePath = resolve(sourceFilePath);

    await access(resolvedSourcePath);

    await pipeline(
      createReadStream(resolvedSourcePath),
      createBrotliDecompress(),
      createWriteStream(resolve(decompressedFilePath)),
    );

    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
