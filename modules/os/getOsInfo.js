import { cpus, EOL, homedir, hostname, arch } from 'node:os';
import { stdout } from 'node:process';
import { showInvalidInputError, showDirectory } from '../../helpers/index.js';

const os = {
  '--EOL': () => EOL,
  '--cpus': () => cpus(),
  '--homedir': () => homedir(),
  '--username': () => hostname(),
  '--architecture': () => arch(),
};

export const getOsInfo = (value) => {
  if (value in os) {
    const result = os[value]();

    stdout.write(`${JSON.stringify(result, null, 2)}${EOL}`);
    showDirectory();
  } else {
    showInvalidInputError();
  }
};
