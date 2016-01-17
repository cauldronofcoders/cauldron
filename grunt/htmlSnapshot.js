 var fs = require('fs');
 var _ = require('lodash');

module.exports = function(grunt) {};
module.exports.createHtmlSnapshotAll = function(grunt) {
    var states = JSON.parse(fs.readFileSync('.tmp/states.json'));
    var stateURLs = [];
    _.forOwn(states, function (state) {
        if(state.url && state.url !== '/changeSim/{lineId}/{customerId}') {
            stateURLs.push(state.url);
        }
    });
    grunt.config.data.htmlSnapshot.all = {
      options: {
        //that's the path where the snapshots should be placed
        //it's empty by default which means they will go into the directory
        //where your Gruntfile.js is placed
        snapshotPath: '.tmp/snapshots/',
        //This should be either the base path to your index.html file
        //or your base URL. Currently the task does not use it's own
        //webserver. So if your site needs a webserver to be fully
        //functional configure it here.
        sitePath: 'http://localhost:9002',
        //you can choose a prefix for your snapshots
        //by default it's 'snapshot_'
        fileNamePrefix: 'sp_',
        //by default the task waits 500ms before fetching the html.
        //this is to give the page enough time to to assemble itself.
        //if your page needs more time, tweak here.
        msWaitForPages: 1,
        //sanitize function to be used for filenames. Converts '#!/' to '_' as default
        //has a filename argument, must have a return that is a sanitized string
        sanitize: function (requestUri) {
            //returns 'index.html' if the url is '/', otherwise a prefix
            if (/\/$/.test(requestUri)) {
              return 'index.html';
            } else {
              return requestUri.replace(/\//g, '-');
            }
        },
        //if you would rather not keep the script tags in the html snapshots
        //set `removeScripts` to true. It's false by default
        removeScripts: true,
        haltOnError: true,
        //set `removeLinkTags` to true. It's false by default
       //removeLinkTags: true,
        //set `removeMetaTags` to true. It's false by default
        //removeMetaTags: true,
        //Replace arbitrary parts of the html

        // allow to add a custom attribute to the body
        bodyAttr: 'data-prerendered',
        //here goes the list of all urls that should be fetched
        urls: stateURLs,
        // a list of cookies to be put into the phantomjs cookies jar for the visited page
        cookies: [],
        // options for phantomJs' page object
        // see http://phantomjs.org/api/webpage/ for available options
        pageOptions: {
            viewportSize : {
                width: 1200,
                height: 800
            },
            onError: function(e) {
                console.log(e);
            },
            onLoadStarted: function() {
                console.log('load onLoadStarted');
            }
        }
      }
    };
};
