var parallelize = module.exports = {};
var numProcessesToSpawn = 3;
var tasksToParallelize = [
	'jshint:all',
	'jscs:all',
	'htmlmin:dist'
];

tasksToParallelize.forEach(function(task) {
	var parts = task.split(':');
	parallelize[parts[0]] = {};
	parallelize[parts[0]][parts[1]] = numProcessesToSpawn;
});
