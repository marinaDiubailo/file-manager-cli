import { cwd } from 'node:process';
import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { showOperationError, showDirectory } from '../../helpers/index.js';

export const getList = async () => {
  try {
    const files = [];
    const folders = [];
    const directory = cwd();
    const content = await readdir(directory);

    for (const item of content) {
      const itemPath = join(directory, item);
      const itemStat = await stat(itemPath);

      if (itemStat.isDirectory()) {
        folders.push(item);
      } else {
        files.push(item);
      }
    }

    const sortedFolders = folders.sort();
    const sortedFiles = files.sort();

    const list = [
      ...sortedFolders.map((folder) => ({
        Name: folder,
        Type: 'directory',
      })),
      ...sortedFiles.map((file) => ({
        Name: file,
        Type: 'file',
      })),
    ];

    console.table(list);
    showDirectory();
  } catch (err) {
    showOperationError();
  }
};
