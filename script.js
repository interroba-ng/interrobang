// Command definitions
const commands = [
    {
      name: 'help',
      description: 'list all available commands',
      execute: () => {
        return commands
          .map(cmd => `  <u>${cmd.name}</u>:<br>&nbsp;&nbsp;${cmd.description}`)
          .join('<br>');
      },
    },

    {
      name: 'clear',
      description: 'clear the terminal screen',
      execute: () => {
        terminal.innerHTML = ""; // Clear the terminal content
        createInputLine();
        return ""; // Avoid extra output
      },
    },
    {
      name: 'about',
      description: 'learn about this site and about the person who made it',
      execute: () => "mostly empty terminal-like website. this will get heavy changes in the upcoming uhhhh",
    },
    {
      name: 'echo',
      description: 'repeat back any given text',
      execute: args => args.join(' '),
    },
    {
      name: 'owo',
      description: 'owo',
      execute: () => "owo",
    },
    {
      name: 'bing!',
      description: "this is just a big ol' test! if youre seeing this, screenshot it and send it to me!",
      execute: () => "this is just a big ol' test! if youre seeing this, screenshot it and send it to me!",
    },

    {
    name: 'date',
    description: 'display the current date and time. optional: <br>     --utc, <br>     --timestamp, <br>     --format=YYYY-MM-DD',
    execute: args => {
      const now = new Date();
      if (args.includes('--timestamp')) {
        return Math.floor(now.getTime() / 1000).toString();
      }

      if (args.includes('--utc')) {
        return now.toUTCString();
      }

      const formatArg = args.find(arg => arg.startsWith('--format='));
      if (formatArg) {
        const format = formatArg.split('=')[1];
        const pad = n => n.toString().padStart(2, '0');

        return format
          .replace('YYYY', now.getFullYear())
          .replace('MM', pad(now.getMonth() + 1))
         .replace('DD', pad(now.getDate()))
          .replace('hh', pad(now.getHours()))
          .replace('mm', pad(now.getMinutes()))
          .replace('ss', pad(now.getSeconds()));
      }

      // Default: local time
      return now.toString();
    }
  },
  ];
  
  // Terminal initialization
  const terminal = document.getElementById('terminal');
  
  function createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');
  
    const prompt = document.createElement('span');
    prompt.textContent = "guest@interroba.ng:~$ ";
    prompt.classList.add('prompt');
  
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input');
    input.autofocus = true;
  
    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    terminal.appendChild(inputLine);
  
    input.focus();
  
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const inputText = input.value.trim();
        const [commandName, ...args] = inputText.split(/\s+/);
  
        // Add the input to the terminal output
        const outputLine = document.createElement('div');
        outputLine.textContent = `${prompt.textContent}${inputText}`;
        terminal.insertBefore(outputLine, inputLine);
  
        // Process the command
        const output = document.createElement('div');
        const command = commands.find(cmd => cmd.name === commandName);
        if (command) {
          output.innerHTML = command.execute(args);
        } else {
          output.textContent = `Command not found: ${commandName}`;
        }
        terminal.insertBefore(output, inputLine);
  
        // Remove the old input line
        terminal.removeChild(inputLine);
  
        // Recreate the input line unless the command is 'clear'
        if (commandName !== 'clear') {
          createInputLine();
        }
  
        // Scroll to the bottom of the terminal
        terminal.scrollTop = terminal.scrollHeight;
      }
    });
  }
  
  // Initialize the terminal
  createInputLine();
  
