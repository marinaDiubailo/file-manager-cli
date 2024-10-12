import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { resolve, basename } from 'node:path';

import {
  showInvalidInputError,
  showOperationError,
  showDirectory,
} from '../../helpers/index.js';

export const copyFile = async (sourcePath, destDirectory) => {
  const fileName = basename(sourcePath);
  const destinationPath = resolve(destDirectory, fileName);

  try {
    await access(resolve(sourcePath));
    await access(resolve(destDirectory));

    const readStream = createReadStream(resolve(sourcePath));
    const writeStream = createWriteStream(destinationPath);

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
      showOperationError();
    });
    writeStream.on('error', (err) => {
      showOperationError();
    });

    writeStream.on('finish', () => {
      showDirectory();
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      showInvalidInputError();
    } else {
      showOperationError();
    }
  }
};
