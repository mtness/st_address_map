var stAddressMap = {
	location: window.location,
	getAddressList: function(element, initial, map) {
		'use strict';
		var siteid = $('.tx_staddressmap_gmap').data('staddressmap-pageid');
		var ajaxtypenumb = $('.tx_staddressmap_gmap').data('staddressmap-ajaxtypenumb');
		var contentid = $('.tx_staddressmap_gmap').data('staddressmap-cid');
		var cidhmac = $('.tx_staddressmap_gmap').data('staddressmap-cidhmac');

		var ajaxurl = 'index.php?id=' + siteid + '&type=' + ajaxtypenumb;
		ajaxurl += '&ts=' + Date.parse(new Date()) + new Date().getMilliseconds();
		$.get(ajaxurl, {
			cid: contentid,
			hmac: cidhmac,
			t: element.data('fieldname'),
			v: element.val(),
			all: initial
		},
		function(data) {
			var bubbleContent = $(data).find('#tx_staddressmap_javascript');
			var addresslist = $(data).find('#tx_staddressmap_addresslist').contents();
			$('#tx_staddressmap_addresslist_' + contentid).html(addresslist);
			stAddressMap.googleMap.showMarker(bubbleContent, map);
		});
	},
	resetSelectfields: function(elements) {
		'use strict';
		elements.each(
			function(index, element) {
				element.selectedIndex = 0;
			}
		);
	},
	replaceContentsInArray: function(search, replace, subject) {
		'use strict';
		if ($.isArray(search)) {
			for (var i = 0; i < search.length; i++) {
				subject = subject.split(search[i]).join(replace[i]);
			}
		} else {
			subject = subject.split(search).join(replace);
		}
		return subject;
	},
	googleMap: {
		init: function(mapelement) {
			'use strict';
			var map;
			var startzoom = mapelement.data('staddressmap-startzoom');
			var coordinates = mapelement.data('staddressmap-centercoordinates').split(',');
			var latlng = new google.maps.LatLng($.trim(coordinates[0]), $.trim(coordinates[1]));
			var mapOptions = {
				zoom: startzoom,
				center: latlng
			};
			map = new google.maps.Map(document.getElementById(mapelement.prop('id')), mapOptions);

			if (0 < mapelement.data('staddressmap-seeatstart')) {
				stAddressMap.getAddressList(mapelement, 1, map);
			}
		},
		createMarker: function(map, name, latlng) {
			'use strict';
			var icon = '';
			name = stAddressMap.replaceContentsInArray(new Array('|-|', '-|-', 'tx_addressmap_replace'), new Array("'", '"', '<a'), name);
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				icon: icon
			});

			google.maps.event.addListener(marker, 'click', function() {
				if (infowindow) {
					infowindow.close();
				}
				infowindow = new google.maps.InfoWindow({
					content: name
				});
				infowindow.open(map, marker);
			});

			google.maps.event.addListener(map, 'click', function() {
				infowindow.close();
			});

			return marker;
		},
		showMarker: function(bubbleContent, map) {
			'use strict';
			var marker;
			bubbleContent.find('[data-staddressmap-bubblecontent="1"]').each(function() {
				var latlng = new google.maps.LatLng($(this).data(
					'staddressmap-bubblelat'),
					$(this).data('staddressmap-bubblelng')
				);

				marker = new google.maps.Marker({
					position: latlng,
					map: map
				});
				stAddressMap.googleMap.addMarkerInfowindow(map, bubbleContent, marker);
			});
		},
		addMarkerInfowindow: function(map, content, marker) {
			'use strict';
			var infowindow = new google.maps.InfoWindow({
				content: content
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}
	}
};

$(document).ready(function() {
	'use strict';
	var siteid = $('.tx_staddressmap_gmap').data('staddressmap-pageid');
	var ajaxtypenumb = $('.tx_staddressmap_gmap').data('staddressmap-ajaxtypenumb');
	var contentid = $('.tx_staddressmap_gmap').data('staddressmap-cid');
	var cidhmac = $('.tx_staddressmap_gmap').data('staddressmap-cidhmac');

	if (0 < $('.tx_staddressmap_gmap').length) {
		$('.tx_staddressmap_gmap').each(function() {
			stAddressMap.googleMap.init($(this));
		});
	}

	/**
	 * get result of selectfield on change select
	 */
	$('.tx_staddressmap_select').change(function() {
		stAddressMap.getAddressList($(this), 0);
		stAddressMap.resetSelectfields($('.tx_staddressmap_select').not(this));
		$('.tx_staddressmap_input').val('');
	});

	/**
	 * get result of input field on press return
	 */
	$('.tx_staddressmap_input').keypress(function(e) {
		if (13 === e.which) {
			stAddressMap.getAddressList($(this), 0);
			$('.tx_staddressmap_select').not(this).each(
				function(index, element) {
					element.selectedIndex = 0;
				}
			);
			stAddressMap.resetSelectfields($('.tx_staddressmap_select'));
		}
	});

	/**
	 * get result of input field on click submit button
	 */
	if (0 < $('.tx_staddressmap_submit').length) {
		$('.tx_staddressmap_submit').click(function() {
			$('.tx_staddressmap_input').each(function(index) {
				if (0 < $(this).prop('value').length) {
					stAddressMap.getAddressList($(this), 0);
				}
			});
		});
	}

	/**
	 * reset all other inputs and selects by focus on a inputfield
	 */
	$('.tx_staddressmap_input').focus(function() {
		$('.tx_staddressmap_input').not(this).val('');
		stAddressMap.resetSelectfields($('.tx_staddressmap_select'));
	});
});

(function() {
	google.maps.Map.prototype.markers = new Array();

	google.maps.Map.prototype.addMarker = function(marker) {
		this.markers[this.markers.length] = marker;
	};

	google.maps.Map.prototype.getMarkers = function() {
		return this.markers;
	};

	google.maps.Map.prototype.clearMarkers = function() {
		if (infowindow) {
			infowindow.close();
		}

		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
	};
})();
