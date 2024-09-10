# SmartDev

**SmartDev** is a powerful CLI tool designed to streamline and automate your development process. It offers file watching, process monitoring, performance insights, and more, while ensuring flexibility and ease of use.

## Features
- **Automatic Process Restarting**: Restarts your application when file changes are detected.
- **Manual Restarts**: You can manually trigger restarts using the `smartdev rs` command.
- **Performance Monitoring**: Monitor system performance in real-time, including CPU and memory usage.
- **Graceful Shutdown**: Use `smartdev close` to gracefully exit the monitoring and process management.
- **File Watching**: Automatically watches files for changes (`.js`, `.mjs`, `.ejs`, `.cjs`).

## Installation

To install the **SmartDev** package, clone the repository and install the dependencies using `npm`:

```bash
npm i smartdev
yarn global add smartdev
pnpm add -g smartdev
```

### Usage
**Once installed, you can use the smartdev command in your terminal**

### Basic Commands

| Command              | Description                                                   |
|----------------------|---------------------------------------------------------------|
| `smartdev [entry.js]` | Starts watching for file changes and runs the specified entry point (default: `index.js`). |
| `smartdev rs`         | Manually restart the application. This command only works when a readline process is active. |
| `smartdev close`      | Closes the application gracefully. Only works when a readline process is active. |
| `smartdev monitor`    | Displays a real-time system performance monitor with CPU, memory usage, and system uptime. Requires a readline process to be active. |

### Start SmartDev

To start **SmartDev**, run the following command with the entry point to your application:

```bash
smartdev <entry point>
```
This will start watching your project files (.js, .mjs, .ejs, .cjs) for changes. When a change is detected, SmartDev will automatically restart the application for you.

If no entry point is specified, SmartDev will default to index.js.

### Manual Restart
While **SmartDev** is running, you can manually restart the application by typing:
```bash
smartdev rs
```
This command is useful when you need to manually trigger a restart without waiting for a file change. Note that the command will only work when a readline process is active, meaning SmartDev is already running.

### Monitor System Performance
You can monitor your system’s performance in real time by typing the following command:
```bash
smartdev monitor
```
**This command will display:**
* CPU Usage (%): A visual bar chart showing real-time CPU usage.
* Memory Usage (MB): Current memory consumption of the system.
* System Uptime (hours): How long your system has been running without a reboot.
* Additional System Info: Includes operating system, CPU details, and total memory.
* Note that SmartDev Monitor will only function when the readline process is active,

---

### A Special Note for You! 💌

Hey there, awesome developer! 😄

Thank you so much for using **SmartDev**! I hope it makes your coding journey smoother and a whole lot more fun. Whether you're restarting your app, monitoring system performance, or just kicking back while **SmartDev** does all the file watching magic, I’m sure you’re building something incredible! 💻✨

If you ever have any feedback, questions, or just want to share your project, don’t hesitate to reach out. I’d love to hear from you! Dm: i._.become_a_devil on Discord

Happy coding and may your terminal always be stylish! 🎉

Stay awesome!  
**The SkyRising Team** 💚


SmartDev License
Copyright (C) 2024 i._.become_a_devil

Permission is hereby granted to any person obtaining a copy of this software to use the software without restriction, including the rights to run the software for personal and commercial use, subject to the following conditions:

1. The software may not be modified, altered, or used to create derivative works.
2. The software may not be distributed, resold, or otherwise transferred.
3. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
