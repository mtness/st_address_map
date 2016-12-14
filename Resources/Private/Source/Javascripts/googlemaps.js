define([
	'googlemaps',
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBxSk_ZAKOJlPzMRSpnTXVuTnftFTwpfTA&callback=initMap&libraries=places,geometry'
	], function() {
	'use strict';

	var staddressmap = {
		location: window.location,

		GoogleMaps: {

			/**
			 * Map object
			 */
			map: null,

			/**
			 * Circle object
			 */
			circle: null,

			/**
			 * Marker object
			 */
			marker: null,

			/**
			 * Markers object
			 */
			markers: [],

			/**
			 * Info window object
			 */
			infowindow: null,

			/**
			 * Address items
			 */
			items: document.querySelectorAll('[data-mapmarkeritem]'),

			/**
			 * Address content
			 */
			markercontent: document.querySelectorAll('[data-mapmarkercontent]'),

			/**
			 * Mapdiv
			 */
			element: document.querySelectorAll('.staddressmap__googlemap')[0],

			/**
			 * Addressfield
			 */
			searchfrompoint: document.querySelectorAll('.staddressmap__searchfrompoint')[0],

			/**
			 * RadiusDropdown
			 */
			searchradius: document.querySelectorAll('.staddressmap__searchradius')[0],

			/**
			 * RadiusDropdown
			 */
			searchsubmit: document.querySelectorAll('.staddressmap__searchsubmit')[0],

			init: function() {
				if (staddressmap.GoogleMaps.items.length) {
					// start new map on load
					google.maps.event.addDomListener(window, 'load', staddressmap.GoogleMaps.initializeGoogleMaps());
					// center map on resize
					google.maps.event.addDomListener(window, 'resize', function() {
						var center = staddressmap.GoogleMaps.map.getCenter();
						google.maps.event.trigger(staddressmap.GoogleMaps.map, 'resize');
						staddressmap.GoogleMaps.map.setCenter(center);
					});

					staddressmap.GoogleMaps.searchsubmit.addEventListener('click', function() {
						staddressmap.GoogleMaps.createRadius();
					});
				}
			},

			/**
			 * init googlemaps
			 */
			initializeGoogleMaps: function() {
				staddressmap.GoogleMaps.map = new google.maps.Map(staddressmap.GoogleMaps.element);

				// create infowindow
				staddressmap.GoogleMaps.infowindow = new google.maps.InfoWindow({
					size: new google.maps.Size(150, 50)
				});

				staddressmap.GoogleMaps.createMarkers();
			},

			/**
			 * create the google maps makers
			 */
			createMarkers: function() {
				var bounds = new google.maps.LatLngBounds();
				staddressmap.GoogleMaps.items.forEach(function(item, i) {
					var lat = item.getAttribute('data-staddressmap-latitude');
					var lng = item.getAttribute('data-staddressmap-longitude');
					var markertitle = item.getAttribute('data-staddressmap-markertitle');
					var markercontent = staddressmap.GoogleMaps.markercontent[i];
					var point = new google.maps.LatLng(lat, lng);

					staddressmap.GoogleMaps.createMarker(point, markertitle, markercontent);
					bounds.extend(point);
					if (i === 0) {
						staddressmap.GoogleMaps.map.setCenter(point);
					}
					i++;
				});

				// auto center if more POI
				if (0 < staddressmap.GoogleMaps.items.length) {
					staddressmap.GoogleMaps.map.fitBounds(bounds);
				}
			},

			/**
			 * add the markers in the Map
			 */
			createMarker: function(latlng, name, html) {
				staddressmap.GoogleMaps.marker = new google.maps.Marker({
					position: latlng,
					// icon: '/typo3conf/ext/in2template/Resources/Public/Images/mapsballoon.png',
					map: staddressmap.GoogleMaps.map,
					title: name,
					zIndex: Math.round(latlng.lat() * -100000) << 5
				});

				staddressmap.GoogleMaps.marker.myname = name;
				google.maps.event.addListener(staddressmap.GoogleMaps.marker, 'click', function() {
					staddressmap.GoogleMaps.infowindow.setContent(html);
					staddressmap.GoogleMaps.infowindow.open(staddressmap.GoogleMaps.map, this);

				});
				staddressmap.GoogleMaps.markers.push(staddressmap.GoogleMaps.marker);
			},

			setMapOnAll: function(map) {
				for (var i = 0; i < staddressmap.GoogleMaps.markers.length; i++) {
					staddressmap.GoogleMaps.markers[i].setMap(map);
				}
			},

			clearMarkers: function() {
				staddressmap.GoogleMaps.setMapOnAll(null);
			},

			createRadius: function() {
				var address = staddressmap.GoogleMaps.searchfrompoint.value;
				var radius = parseInt(staddressmap.GoogleMaps.searchradius.value, 10) * 1000;
				staddressmap.GoogleMaps.clearMarkers(null);
				var geocoder = new google.maps.Geocoder();
				var bounds = new google.maps.LatLngBounds();
				geocoder.geocode({address: address}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						staddressmap.GoogleMaps.map.setCenter(results[0].geometry.location);
						if (staddressmap.GoogleMaps.circle) {
							staddressmap.GoogleMaps.circle.setMap(null);
						}

						staddressmap.GoogleMaps.circle = new google.maps.Circle({
							center: results[0].geometry.location,
							radius: radius,
							fillOpacity: 0.35,
							fillColor: '#FF0000',
							map: staddressmap.GoogleMaps.map
						});
						staddressmap.GoogleMaps.map.fitBounds(staddressmap.GoogleMaps.circle.getBounds());

						var marker = new google.maps.Marker({
							map: staddressmap.GoogleMaps.map,
							position: results[0].geometry.location,
							visible: false
						});

						for (var i = 0; i < staddressmap.GoogleMaps.markers.length;i++) {
							if (google.maps.geometry.spherical.computeDistanceBetween(staddressmap.GoogleMaps.markers[i].getPosition(), marker.getPosition()) < radius) {
								bounds.extend(staddressmap.GoogleMaps.markers[i].getPosition());
								staddressmap.GoogleMaps.markers[i].setMap(staddressmap.GoogleMaps.map);
							} else {
								staddressmap.GoogleMaps.markers[i].setMap(null);
							}
						}
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			}
		}
	};

	staddressmap.GoogleMaps.init();
});
