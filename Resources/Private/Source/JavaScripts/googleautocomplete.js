define([
	'googleautocomplete',
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBxSk_ZAKOJlPzMRSpnTXVuTnftFTwpfTA&callback=initMap&libraries=places,geometry'
], function() {
	'use strict';

	var staddressmap = {
		GoogleAutocomplete: {

			autocomplete: null,

			initAutocomplete: function(searchfrompoint) {
				staddressmap.GoogleAutocomplete.searchfrompoint = searchfrompoint[0];
				staddressmap.GoogleAutocomplete.autocomplete = new google.maps.places.Autocomplete(
					(staddressmap.GoogleAutocomplete.searchfrompoint),
					{types: ['geocode']}
					);
			}
		}
	};

	var searchfrompoint = document.querySelectorAll('.staddressmap__searchfrompoint');
	staddressmap.GoogleAutocomplete.initAutocomplete(searchfrompoint);
});
