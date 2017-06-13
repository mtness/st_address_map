var staddressmap = document.querySelectorAll('.staddressmap');
var webmapservice = staddressmap[0].getAttribute('data-staddressmap-webmapservices');
var staddressmapsearchfrompoint = document.querySelectorAll('.staddressmap__searchfrompoint');
var mapwrapper = document.querySelectorAll('.staddressmap__map');

requirejs.config({
	paths: {
		async: 'Vendor/async',
		markerclusterer: 'Vendor/markerclusterer'
	},
	baseUrl: '/typo3conf/ext/st_address_map/Resources/Public/Javascripts',
	shim: {
		googlemap: ['markerclusterer']
	},
	urlArgs: 'v=0.0.1'
	// urlArgs: 'v=' +  (new Date()).getTime() // Devline
});

if (staddressmap.length > 0) {
	// switch webmapservice
	if (webmapservice === 'googlemap') {
		if (mapwrapper.length > 0) {
			require(['googlemap']);
		}

		if (staddressmapsearchfrompoint.length > 0) {
			require(['googleautocomplete']);
		}
	} else {
		if (mapwrapper.length > 0) {
			require(['bingmap']);
		}
	}
}
