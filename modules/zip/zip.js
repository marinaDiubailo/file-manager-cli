import { compress } from './compress.js';
import { decompress } from './decompress.js';

export const zip = {
  compress: (sourceFilePath, compressedFilePath) => {
    compress(sourceFilePath, compressedFilePath);
  },
  decompress: (sourceFilePath, decompressedFilePath) => {
    decompress(sourceFilePath, decompressedFilePath);
  },
};
