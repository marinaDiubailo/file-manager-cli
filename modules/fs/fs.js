import { readFile } from './readFile.js';
import { createFile } from './createFile.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFile.js';
import { deleteFile } from './deleteFile.js';

export const fs = {
  cat: (path) => {
    readFile(path);
  },
  add: (fileName) => {
    createFile(fileName);
  },
  rn: (pathToFile, newFileName) => {
    renameFile(pathToFile, newFileName);
  },
  cp: (sourcePath, destPath) => {
    copyFile(sourcePath, destPath);
  },
  mv: (sourcePath, destDirectory) => {
    moveFile(sourcePath, destDirectory);
  },
  rm: (filePath) => {
    deleteFile(filePath);
  },
};
