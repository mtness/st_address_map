var stAddressMap = {
	location: window.location,
	getResultofSearch: function(tablefield) {
		'use strict';
		var siteid = $('#tx_staddressmap_addresslist_pageid').html();
		var ajaxtypenumb = $('#tx_staddressmap_addresslist_ajaxtypenumb').html();




	}
};

window.onload = function() {
	'use strict';
	initialize();
};

$(document).ready(function() {
	'use strict';
	var siteid = $('#tx_staddressmap_addresslist_pageid').html();
	var ajaxtypenumb = $('#tx_staddressmap_addresslist_ajaxtypenumb').html();

	$('.tx_staddressmap_select').change(function() {


		stAddressMap.getResultofSearch('test');

		var tablefield = this.id.split('_');

		$.get('index.php?id=' + siteid + '&type=' + ajaxtypenumb + '&ts=' + Date.parse(new Date()) + new Date().getMilliseconds(),{
			cid: $('#tx_staddressmap_cid').val(),
			hmac: $('#tx_staddressmap_cidhmac').val(),
			t: tablefield[3],
			v: $('#' + this.id).val()
		},
		function(data) {
			$('#tx_staddressmap_addresslist_' + $('#tx_staddressmap_cid').val()).html(data);
			showMarker(0);
		});

		$('.tx_staddressmap_select').not(this).each(
			function(index, element) {
				element.selectedIndex = 0;
			}
		);

		$('.tx_staddressmap_input').val('');
	});

	$('.tx_staddressmap_input').keypress(function(e) {

		// stAddressMap.getResultofInput(e);

		if (e.which === 13) {
			var tablefield = this.id.split('_');

			$.get('index.php?id=' + siteid + '&type=' + ajaxtypenumb + '&ts=' + Date.parse(new Date()) + new Date().getMilliseconds(),{
				cid: $('#tx_staddressmap_cid').val(),
				hmac: $('#tx_staddressmap_cidhmac').val(),
				t: tablefield[3],
				v: $('#' + this.id).val()
			},
			function(data) {
				$('#tx_staddressmap_addresslist_' + $('#tx_staddressmap_cid').val()).html(data);
				showMarker(0);
			});

			$('.tx_staddressmap_select').not(this).each(
				function(index, element) {
					element.selectedIndex = 0;
				}
			);

			$('.tx_staddressmap_select').each(
				function(index, element) {
					element.selectedIndex = 0;
				}
			);
		}
	});

	$('.tx_staddressmap_input').focus(function() {
		$('.tx_staddressmap_input').not(this).val('');
		$('.tx_staddressmap_select').each(
			function(index, element) {
				element.selectedIndex = 0;
			}
		);
	});

	if ($('#tx_staddressmap_seeatstart').val() === 1) {
		$.get('index.php?id=' + siteid + '&type=' + ajaxtypenumb + '&ts=' + Date.parse(new Date()) + new Date().getMilliseconds(),{
			cid: $('#tx_staddressmap_cid').val(),
			hmac: $('#tx_staddressmap_cidhmac').val(),
			t: '1',
			v: $('#' + this.id).val(),
			all: 1
		},
		function(data) {
			$('#tx_staddressmap_addresslist_' + $('#tx_staddressmap_cid').val()).html(data);
			setTimeout(function() {
				showMarker(0);
			}, 500);
		});
	}

	if ($('.tx_staddressmap_submit').length > 0) {
		$('.tx_staddressmap_submit').click(function() {
			var tablefield = $('.tx_staddressmap_input[value!=""]').attr('id').split('_');
			$.get('index.php?id=' + siteid + '&type=' + ajaxtypenumb + '&ts=' + Date.parse(new Date()) + new Date().getMilliseconds(),{
				cid: $('#tx_staddressmap_cid').val(),
				hmac: $('#tx_staddressmap_cidhmac').val(),
				t: tablefield[3],
				v: $('.tx_staddressmap_input[value!=""]').val()
			},
			function(data) {
				$('#tx_staddressmap_addresslist_' + $('#tx_staddressmap_cid').val()).html(data);
				showMarker(0);
			});

			$('.tx_staddressmap_select').not(this).each(
				function(index, element) {
					element.selectedIndex = 0;
				}
			);

			$('.tx_staddressmap_select').each(
				function(index, element) {
					element.selectedIndex = 0;
				}
			);
		});
	}
});

function isArray(value) {
	'use strict';
	if (typeof value === 'object' && value && value instanceof Array) {
		return true;
	}
	return false;
}

function strReplace(s, r, c) {
	'use strict';
	if (isArray(s)) {
		for (var i = 0; i < s.length; i++) {
			c = c.split(s[i]).join(r[i]);
		}
	} else {
		c = c.split(s).join(r);
	}
	return c;
}

var infowindow;
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

function createMarker(name, latlng) {
	'use strict';
	name = strReplace(new Array("|-|","-|-","tx_addressmap_replace"), new Array("'",'"','<a'), name);
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		icon: icon
	});
	google.maps.event.addListener(marker, "click", function(){
		if (infowindow)
			infowindow.close();
		infowindow = new google.maps.InfoWindow({
			content: name
		});
		infowindow.open(map, marker);
	});
	return marker;
}

function showMarker(id){
	if(id=='-1') {
		return;
	}
	map.clearMarkers();
	if(circle != null) circle.setMap(null);
	if(circledata) circle = new google.maps.Circle(circledata);

	if(marker.length > 0) {
		map.setCenter(new google.maps.LatLng(centerpoints[id].lat, centerpoints[id].lng));
		map.setZoom(detailzoom[id]);
		for (var i = 0; i < marker[id].length; i++) {
			var latlng = new google.maps.LatLng(marker[id][i].lat, marker[id][i].lng);
			map.addMarker(createMarker(marker[id][i].name, latlng));
			while (map.getBounds().contains(latlng) == false) map.setZoom(--detailzoom[id]);
		}
	}
}



