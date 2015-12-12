Package.describe({
  name: 'merlin:external-api',
  version: '0.0.1',
  summary: 'Async and sync functions to handle calling external APIs',
  git: 'https://github.com/merlinpatt/external-api',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('http', ['server']);

  api.addFiles('external-api.js');
  api.export('ExternalApi');
});
