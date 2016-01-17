//Use PhantomJS to go to the Rebellion Web, Retail, and Care UAT environments and gather state information based off these.
//Saves this information to .tmp/states.json
var _ = require('lodash');
var fs = require('fs');
var page = require('webpage').create();
var allStates = [];
var urls = [
	'http://localhost:9002/'
];
var numUrlsCompleted = 0;
var openUrl = function(url) {
	page.open(url, function(status) {
		function checkReadyState() {
			setTimeout(function () {
				var readyState = page.evaluate(function () {
					return document.readyState;
				});

				if ('complete' === readyState) {
					onPageReady();
				} else {
					checkReadyState();
				}
			}, 3000);
		}

		function onPageReady() {
			var channelStates = page.evaluate(function() {
				var ngElement = angular.element(document.body);
				var injector = ngElement.injector();
				var $state = injector.get('$state');
				var states = $state.get();

				angular.forEach(states, function(state) {
					state.href = $state.href(state.name, null, {});
				});

				return states;
			}) || [];
			channelStates.forEach(function(channelState) {
				var allStateNames = _.pluck(allStates, 'name');
				if (channelState.name && allStateNames.indexOf(channelState.name) === -1) {
					allStates.push(channelState);
				}
			});
			after();

		}

		checkReadyState();
	});
}

function after() {
	numUrlsCompleted++;
	if (numUrlsCompleted < urls.length) {
		openUrl(urls[numUrlsCompleted]);
	}
	else {
		console.log('File .tmp/states.json created for all state information!');
		fs.write('.tmp/states.json', JSON.stringify(allStates, null, 4), 'w');
		phantom.exit();
	}
}

openUrl(urls[0]);
