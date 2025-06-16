module.exports = {
  apps: [
    {
      name: 'bingo',
      script: 'dist/main.js',
      cwd: '/data/apps/bingo-backend',
      env_file: '.env',
    },
  ],
};