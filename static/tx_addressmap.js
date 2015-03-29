var infowindow;
function createMarker(name, latlng) {
	'use strict';
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
}

function showMarker(id) {
	'use strict';
	if ('-1' === id) {
		return;
	}
	map.clearMarkers();
	if (null != circle) {
		circle.setMap(null);
	}
	if (circledata) {
		circle = new google.maps.Circle(circledata);
	}

	if (0 < marker.length) {
		map.setCenter(new google.maps.LatLng(centerpoints[id].lat, centerpoints[id].lng));
		map.setZoom(detailzoom[id]);
		for (var i = 0; i < marker[id].length; i++) {
			var latlng = new google.maps.LatLng(marker[id][i].lat, marker[id][i].lng);
			map.addMarker(createMarker(marker[id][i].name, latlng));
			while (map.getBounds().contains(latlng) == false) map.setZoom(--detailzoom[id]);
		}
	}
}

var stAddressMap = {
	location: window.location,
	getResultofSearch: function(element) {
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
			v: element.val()
		},
		function(data) {
			$('#tx_staddressmap_addresslist_' + contentid).html(data);
			showMarker(0);
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
	}
};

window.onload = function() {
	'use strict';
	initialize();
};

$(document).ready(function() {
	'use strict';
	var siteid = $('.tx_staddressmap_gmap').data('staddressmap-pageid');
	var ajaxtypenumb = $('.tx_staddressmap_gmap').data('staddressmap-ajaxtypenumb');
	var contentid = $('.tx_staddressmap_gmap').data('staddressmap-cid');
	var cidhmac = $('.tx_staddressmap_gmap').data('staddressmap-cidhmac');

	/**
	 * get result of selectfield on change select
	 */
	$('.tx_staddressmap_select').change(function() {
		stAddressMap.getResultofSearch($(this));
		stAddressMap.resetSelectfields($('.tx_staddressmap_select').not(this));
		$('.tx_staddressmap_input').val('');
	});

	/**
	 * get result of input field on press return
	 */
	$('.tx_staddressmap_input').keypress(function(e) {
		if (13 === e.which) {
			stAddressMap.getResultofSearch($(this));
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
					stAddressMap.getResultofSearch($(this));
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

	/**
	 * get the data on start if data-seeatstart is set
	 */
	if (0 < $('.tx_staddressmap_gmap[data-staddressmap-seeatstart]').length) {
		$.get('index.php?id=' + siteid + '&type=' + ajaxtypenumb + '&ts=' + Date.parse(new Date()) + new Date().getMilliseconds(),{
			cid: contentid,
			hmac: cidhmac,
			t: '1',
			v: $('#' + this.id).val(),
			all: 1
		},
		function(data) {
			$('#tx_staddressmap_addresslist_' + contentid).html(data);
			setTimeout(function() {
				showMarker(0);
			}, 500);
		});
	}
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
