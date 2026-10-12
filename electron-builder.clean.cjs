const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync(path.join(__dirname, 'electron-builder.yml'), 'utf8'));

// Load the shared configuration directly: builder's `extends` concatenates
// extraResources arrays, which would keep the developer's database snapshot.
config.extends = null;
config.extraResources = config.extraResources.filter(resource => resource.to !== 'db/sheikh-ahmed-mobile.db');

module.exports = config;
