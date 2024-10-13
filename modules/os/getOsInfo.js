import { cpus, EOL, homedir, userInfo, arch } from 'node:os';
import { stdout } from 'node:process';
import { showInvalidInputError, showDirectory } from '../../helpers/index.js';

const getCpusInfo = () => {
  const result = {};
  const cpusArr = cpus();
  const cpusCount = cpusArr.length;
  result['Total CPUs'] = cpusCount;

  cpusArr.map((cpu, idx) => {
    const model = cpu.model.trim();
    const clockRate = (cpu.speed / 1000).toFixed(2);
    result[`CPU ${idx + 1}`] = { model: model, clockRate: `${clockRate} GHz` };
  });

  return result;
};
const os = {
  '--EOL': () => EOL,
  '--cpus': () => getCpusInfo(),
  '--homedir': () => homedir(),
  '--username': () => userInfo().username,
  '--architecture': () => arch(),
};

export const getOsInfo = (value) => {
  if (value in os) {
    const result = os[value]();

    stdout.write(`${JSON.stringify(result)}${EOL}`);
    showDirectory();
  } else {
    showInvalidInputError();
  }
};
