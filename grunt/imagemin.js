module.exports = {
		options: {
		    optimizationLevel: 3
		  },
		  build: {
		    files: [{
		    	cwd: '<%= package.path.app %>/',
		     	expand: true,
		     	src: ['images/**/*.jpg','images/**/*.gif','images/**/*.jpeg','images/**/*.png',
		     	     '**/*.jpg','**/*.gif','**/*.jpeg','**/*.png'],
		     	dest: 'dist'
		    }]
		  }
};
