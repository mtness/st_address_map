var staddressmap = document.querySelectorAll('.staddressmap');
var staddressmapsearchfrompoint = document.querySelectorAll('.staddressmap__searchfrompoint');
var googelmapwrapper = document.querySelectorAll('.staddressmap__googlemap');

requirejs.config({
	paths: {
		async: 'Vendor/async',
		markerclusterer: 'Vendor/markerclusterer'
	},
	baseUrl: '/typo3conf/ext/st_address_map/Resources/Public/Javascripts',
	shim: {
		googlemaps: ['markerclusterer']
	}
});

if (staddressmap.length > 0) {
	if (googelmapwrapper.length > 0) {
		require(['googlemaps']);
	}


	if (staddressmapsearchfrompoint.length > 0) {
		require(['googleautocomplete']);
	}
}
