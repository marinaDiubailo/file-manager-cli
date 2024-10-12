import { cwd, stdout } from 'node:process';
import { EOL } from 'node:os';

export const showDirectory = () => {
  const currentDirectory = cwd();
  stdout.write(`You are currently in ${currentDirectory}${EOL}`);
};
