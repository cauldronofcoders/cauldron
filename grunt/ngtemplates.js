module.exports = {
	dist: {
		options: {
			module: 'metroApp',
			usemin: 'scripts/scripts.js',
			htmlmin: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeCommentsFromCDATA: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true
			}
		},
		cwd: '<%= package.path.tmp %>',
		src: 'scripts/*{,*/*}.html',
		dest: '<%= package.path.tmp %>/scripts/templates.js'
	}
}
