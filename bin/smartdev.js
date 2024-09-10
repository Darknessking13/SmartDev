#!/usr/bin/env node
const { startWatching, manualRestart } = require('../lib/watcher');
const path = require('path');

const entryPoint = process.argv[2] || 'index.js';

startWatching(path.resolve(entryPoint));
manualRestart(entryPoint);
