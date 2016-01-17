var replaceBuildChannel = module.exports = {};
var package = require('../../package.json');
var buildUtil = require('./build-util');
var app, otherChannels, channelPermutationSubsets;
/**
 * This functionality is intended to remove chunks of HTML that is specific to a channel or set of channels
 * i.e. <!-- start-care-retail -->My Channel Specific HTML<!-- end-care-retail -->
 */
replaceBuildChannel.init = function (_app_) {
  replaceBuildChannel.app = app = _app_;

  otherChannels = buildUtil.getAllChannelNames(app);
  channelPermutationSubsets = buildUtil.getAllPermutationSubsets(otherChannels);
  //The Regular Expressions need to run in largest (or most specific) first, so we reverse the order of this list.
  channelPermutationSubsets = channelPermutationSubsets.reverse();
};

replaceBuildChannel.removeChannelComments = function (content) {
  if (content.contains('start-') && content.contains('end-')) {
    channelPermutationSubsets.forEach(function (channels) {
      var channelListMatch = channels.join('-');
      if (content.contains('start-' + channelListMatch)) {
        var regex = 'start-' + channelListMatch + '[\\s\\S]*?' + 'end-' + channelListMatch;
        content = content.replace(new RegExp(regex, 'gm'), '');
      }
    });
  }
  //Fix new line characters to work with both mac and window
  content = content.replace(/[\r\n]+/g, '\n');
  return content;
};

//This function removes the channel names, if found in all caps for a channel

replaceBuildChannel.setupChannelUrl = function (content) {
  if (content.contains(app.toUpperCase())) {
    content = content.replace(new RegExp('/[A-Z]*?' + app.toUpperCase() + '[A-Z]*', 'g'), '');
    content = content.replace(new RegExp('\'/[A-Z]*?' + app.toUpperCase() + '[A-Z]*?\'', 'g'), '\'/\'');
    content = content.replace(new RegExp('"/[A-Z]*?' + app.toUpperCase() + '[A-Z]*?"', 'g'), '"/"');
  }
  return content;
};
