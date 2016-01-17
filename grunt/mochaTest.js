module.exports = {
  eslint: {
    options: {
      reporter: 'spec',
      captureFile: 'eslint/results.md', // Optionally capture the reporter output to a file
      quiet: false, // Optionally suppress output to standard out (defaults to false)
      clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
    },
    src: ['eslint/test/rules/*.js']
  }
};

