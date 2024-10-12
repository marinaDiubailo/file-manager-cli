import { changeDirectory } from './changeDirectory.js';
import { goUp } from './goUp.js';

export const nwd = {
  cd: (path) => {
    changeDirectory(path);
  },
  up: () => {
    goUp();
  },
};
