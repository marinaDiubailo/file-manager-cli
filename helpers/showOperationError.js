import { EOL } from 'node:os';
import { stdout } from 'node:process';

export const showOperationError = () => {
  stdout.write('Operation failed' + EOL);
};
