module.exports = {
     all : {
		options : {
			engine : 'im',

			sizes : [ {
				width : '320px',
				height :'240px'
			}, {
				name : 'medium',
				width : 480
			}, {
				name : "large",
				width : 600,
				suffix : "_x2",
				quality : 100
			} ]
		},
		files : [ {
			expand : true,
			src : [ '*.png' ],
			cwd : 'app/images/',
			dest: 'app/responsive-images'
		} ]
	},

	some : {
		options : {
			engine : 'im',

			sizes : [ {
				width : '100%',
				height : '120%'
			}, {
				name : 'large',
				width : 640
			}, {
				name : "large",
				width : 1024,
				height : 600,
				suffix : "_x2",
				quality : 100
			} ]
		},
		files : [ {
			expand :true,
			cwd : 'app/images/',
			src : [ '*.jpeg' ],
			dest : 'tmp/'

		} ]

	},
};
