var buildUtil = module.exports = {};
var fs = require('fs');
/**
 * Read all the Channel Names from the app-configurations folder.
 * if excludeChannelName is passed in, that variable will not be added to the list.
 */
buildUtil.getAllChannelNames = function (excludeChannelName) {
  var channels = [];
  var appConfigFiles = fs.readdirSync('./app-configurations');

  appConfigFiles.forEach(function (appConfigFile) {
    if (appConfigFile.endsWith('.json')) {
      var channelName = appConfigFile.substring(0, appConfigFile.length - 5);
      if (channelName !== excludeChannelName) {
        channels.push(channelName);
      }
    }
  });
  return channels;
};

/**
 * Get all permutations of all combination subsets of the list.
 * Calls combine and permutate below.
 */
buildUtil.getAllPermutationSubsets = function (inputList) {
  var subsets = combine(inputList, 1);

  var fullPermutations = [];
  subsets.forEach(function (subset) {
    if (subset.length === 1) {
      fullPermutations.push(subset);
    } else {
      var subsetPermutations = permutate(subset);
      fullPermutations = fullPermutations.concat(subsetPermutations);
    }
  });
  return fullPermutations;
};

/**
 * Find all combinatations of array a's elements with a minimum length of min.
 */
var combine = function (a, min) {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};

/**
 * Find all permutations of the array.
 */
var permutate = function (array) {
  return array.reduce(function permute(res, item, key, arr) {
    return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function (perm) {
      return [item].concat(perm);
    }) || item);
  }, []);
};
