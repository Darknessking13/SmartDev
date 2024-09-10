const os = require('os');
const osu = require('os-utils'); // For CPU usage and other metrics
const blessed = require('blessed');
const contrib = require('blessed-contrib');

function startMonitor() {
  // Initialize the blessed screen
  const screen = blessed.screen();

  // Create the grid layout for the dashboard
  const grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: screen
  });

  // Line chart for memory usage
  const memUsageLine = grid.set(0, 0, 6, 6, contrib.line, {
    style: { line: "yellow", text: "green", baseline: "black" },
    label: "Memory Usage (MB)",
    showLegend: true
  });

  // Bar chart for CPU usage
  const cpuUsageBar = grid.set(0, 6, 6, 6, contrib.bar, {
    label: "CPU Usage (%)",
    barWidth: 6,
    barSpacing: 10,
    xOffset: 0,
    maxHeight: 100
  });

  // Uptime gauge
  const uptimeGauge = grid.set(6, 0, 3, 6, contrib.gauge, {
    label: "System Uptime (hours)",
    stroke: "green",
    fill: "white"
  });

  // Table for system info
  const sysInfoTable = grid.set(6, 6, 6, 6, contrib.table, {
    keys: true,
    fg: 'white',
    label: 'System Info',
    columnSpacing: 1,
    columnWidth: [24, 20]
  });

  // Update memory usage every second
  let memoryHistory = [];
  const maxHistory = 30;

  function updateMemoryUsage() {
    const totalMemMB = os.totalmem() / 1024 / 1024;
    const freeMemMB = os.freemem() / 1024 / 1024;
    const usedMemMB = totalMemMB - freeMemMB;

    memoryHistory.push(usedMemMB);
    if (memoryHistory.length > maxHistory) memoryHistory.shift();

    memUsageLine.setData([{
      title: 'Memory Used',
      x: Array.from({ length: memoryHistory.length }, (_, i) => i + 1),
      y: memoryHistory
    }]);

    screen.render();
  }

  // Update CPU usage every second
  function updateCPUUsage() {
    osu.cpuUsage(function(cpuPercent) {
      cpuUsageBar.setData({
        titles: ['CPU'],
        data: [Math.round(cpuPercent * 100)]
      });
      screen.render();
    });
  }

  // Update system uptime every second
  function updateUptime() {
    const uptimeHours = Math.floor(os.uptime() / 3600);
    uptimeGauge.setData([uptimeHours]);
    screen.render();
  }

  // Update system info
  function updateSystemInfo() {
    const sysInfo = [
      ['OS', `${os.type()} ${os.release()}`],
      ['Total Memory', `${Math.round(os.totalmem() / 1024 / 1024)} MB`],
      ['Free Memory', `${Math.round(os.freemem() / 1024 / 1024)} MB`],
      ['CPU Cores', os.cpus().length],
      ['CPU Model', os.cpus()[0].model],
      ['System Uptime', `${Math.floor(os.uptime() / 3600)} hours`]
    ];

    sysInfoTable.setData({
      headers: ['Metric', 'Value'],
      data: sysInfo
    });

    screen.render();
  }

  // Set up intervals for updating data
  setInterval(updateMemoryUsage, 1000);
  setInterval(updateCPUUsage, 1000);
  setInterval(updateUptime, 1000);
  setInterval(updateSystemInfo, 1000);

  // Exit on "q" or "Ctrl+C"
  screen.key(['escape', 'q', 'C-c'], function() {
    return process.exit(0);
  });

  // Render the screen
  screen.render();
}

module.exports = { startMonitor };
