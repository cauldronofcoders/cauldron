module.exports = {
		options: {
		    thresholds: {
		      weight: 4000,
		      speed: 10000,
		      score: 60,
		      requests: 300
		    }
		  },
			pages: {
			    files: [
			      {
			        src: 'http://localhost:9000/#!/inventory/accordion'
			      },
			      {
			        src: 'http://localhost:9000/#!/inventory/compare-phone',
			      },
			      {
				    src: 'http://localhost:9000/#!/inventory/weather',
				  },
				  {
					src: 'http://localhost:9000/#!/inventory/cart',
				  },
				  {
				    src: 'http://localhost:9000/#!/inventory/carousel',
				  }
			    ]
			  }

}
