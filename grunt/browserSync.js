module.exports = {
  dev: {
    src: ['./.tmp/*{*/*}'],
    options: {
    	port: 9000,
    	watchTask: true
    }
  },
  options: {
    server: {
      baseDir: ['./.tmp', './'],
    }
  }
};
