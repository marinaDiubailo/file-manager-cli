import { argv, chdir, exit } from 'node:process';
import { stdout, stdin } from 'node:process';
import { EOL, homedir } from 'node:os';
import readline from 'node:readline/promises';
import { showDirectory } from './helpers/showDirectory.js';

const greetings = (username) => {
  stdout.write(`Welcome to the File Manager, ${username}!${EOL}`);
};
const farewell = (username) => {
  stdout.write(`Thank you for using File Manager, ${username}, goodbye!${EOL}`);
  exit(0);
};

const initCLI = () => {
  const [, , ...args] = argv;

  let username = undefined;

  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    key === '--username' && (username = value);
  });

  chdir(homedir());
  greetings(username);
  showDirectory();

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: '',
  });

  rl.prompt();

  rl.on('line', async (input) => {
    const command = input.trim().split(' ');

    if (input === '.exit') {
      farewell(username);
    } else {
      // TODO: implement command manager
    }
  });

  rl.on('SIGINT', () => {
    farewell(username);
  });

  rl.on('close', () => {
    farewell(username);
  });
};

initCLI();
