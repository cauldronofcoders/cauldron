module.exports = {
	validateAndCopyFilesToTemp: [
		'less:app',
		'parallelize:jshint:all',
		//'parallelize:jscs:all',
		'copy:appToTmp',
		'copy:envConfig'
	],
	validateAndCopyFilesToTempDist: [
		'less:app',
		'parallelize:jshint:all',
        //'jscs:all',
        'copy:appToTmp',
        'copy:envConfig'
    ],
    buildMetaTasks: [
        'sitemap:dist',
        'ngdocs:api'
    ]
}
