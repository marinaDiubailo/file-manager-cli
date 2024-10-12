import { EOL } from 'node:os';
import { stdout } from 'node:process';

export const showInvalidInputError = () => {
  stdout.write('Invalid input' + EOL);
};
