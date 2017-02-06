define([
	'bingmap',
	'async!https://www.bing.com/api/maps/mapcontrol?branch=experimental'
], function() {
	'use strict';

	var staddressmap = {
		location: window.location,

		BingMap: {

			/**
			 * Class of hidden element in list
			 */
			hiddenclassname: 'staddressmap__hiddenlistitem',

			/**
			 * Selector of distance wrapper
			 */
			distancewrapper: '.staddressmap__distance',

			/**
			 * Class of distance wrapper when is filled
			 */
			distanceWrapperShowClassname: 'staddressmap__distance--show',

			/**
			 * Radius color
			 */
			radiuscolor: '#FF0000',

			/**
			 * Radius opacity
			 */
			radiusopacity: 0.35,

			/**
			 * Radius strokeweight
			 */
			radiusstrokeweight: 0,

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
			element: document.querySelectorAll('.staddressmap__map')[0],

			/**
			 * Addressfield
			 */
			searchfrompoint: document.querySelectorAll('.staddressmap__searchfrompoint')[0],

			/**
			 * RadiusDropdown
			 */
			searchradius: document.querySelectorAll('.staddressmap__searchradius')[0],

			/**
			 * Searchbutton
			 */
			searchsubmit: document.querySelectorAll('.staddressmap__searchsubmit')[0],

			/**
			 * Resetbutton
			 */
			searchreset: document.querySelectorAll('.staddressmap__searchreset')[0],

			init: function() {
				console.log('teste');

				staddressmap.BingMap.map = new Microsoft.Maps.Map(staddressmap.BingMap.element, {
					credentials: 'AoaPK47y-Kxe6t_cmrtFWDQzCjOGaJMofONHzpy3WCkf9RXaQuATQSv99rYjwxu0'
				});

				staddressmap.BingMap.createMarkers();

				// var pushpin = new Microsoft.Maps.Pushpin(staddressmap.BingMap.map.getCenter(), null);
				// staddressmap.BingMap.map.entities.push(pushpin);

				// if (staddressmap.GoogleMaps.items.length) {
				// 	// start new map on load
				// 	google.maps.event.addDomListener(window, 'load', staddressmap.GoogleMaps.initializeGoogleMaps());
				// 	// center map on resize
				// 	google.maps.event.addDomListener(window, 'resize', function() {
				// 		var center = staddressmap.GoogleMaps.map.getCenter();
				// 		google.maps.event.trigger(staddressmap.GoogleMaps.map, 'resize');
				// 		staddressmap.GoogleMaps.map.setCenter(center);
				// 	});
				//
				// 	staddressmap.GoogleMaps.searchsubmit.addEventListener('click', function() {
				// 		staddressmap.GoogleMaps.createRadius();
				// 	});
				//
				// 	staddressmap.GoogleMaps.searchreset.addEventListener('click', function() {
				// 		staddressmap.GoogleMaps.createMarkers();
				// 	});
				// }
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
			 * create the maps makers
			 */
			createMarkers: function() {
				for (var i = 0; i < staddressmap.BingMap.items.length;i++) {
					staddressmap.BingMap.items[i].classList.remove(staddressmap.BingMap.hiddenclassname);
				}

				// var bounds = new google.maps.LatLngBounds();
				staddressmap.BingMap.items.forEach(function(item, i) {
					var lat = item.getAttribute('data-staddressmap-latitude');
					var lng = item.getAttribute('data-staddressmap-longitude');
					var markertitle = item.getAttribute('data-staddressmap-markertitle');
					var markercontent = staddressmap.BingMap.markercontent[i];
					staddressmap.BingMap.markers.push(new Microsoft.Maps.Location(lat, lng));

					// staddressmap.BingMap.createMarker(point, markertitle, markercontent);
					// if (i === 0) {
					// 	staddressmap.GoogleMaps.map.setCenter(point);
					// }
					i++;
				});

				console.log(staddressmap.BingMap.markers);
				console.log(Microsoft.Maps.TestDataGenerator.getPushpins(10, staddressmap.BingMap.map.getBounds()));
				staddressmap.BingMap.createMarker(staddressmap.BingMap.markers);

				// auto center if more POI
				// if (0 < staddressmap.GoogleMaps.markers.length) {
				// 	staddressmap.GoogleMaps.map.fitBounds(bounds);
				// }
			},

			/**
			 * add the markers in the Map
			 */
			createMarker: function(pushpins) {
				var layer = new Microsoft.Maps.Layer();
				// layer.add(Microsoft.Maps.TestDataGenerator.getPushpins(10, staddressmap.BingMap.map.getBounds()));
				layer.add(staddressmap.BingMap.markers);
				staddressmap.BingMap.map.layers.insert(layer);

				// console.log(latlng);
				// staddressmap.BingMap.map(latlng);
				// var layer = new Microsoft.Maps.Layer();
				// layer.add(latlng);
				// staddressmap.BingMap.map.layers.insert(layer);

				// staddressmap.GoogleMaps.marker = new google.maps.Marker({
				// 	position: latlng,
				// 	// icon: '/typo3conf/ext/in2template/Resources/Public/Images/mapsballoon.png',
				// 	map: staddressmap.GoogleMaps.map,
				// 	title: name,
				// 	zIndex: Math.round(latlng.lat() * -100000) << 5
				// });
				//
				// staddressmap.GoogleMaps.marker.myname = name;
				// google.maps.event.addListener(staddressmap.GoogleMaps.marker, 'click', function() {
				// 	staddressmap.GoogleMaps.infowindow.setContent(html);
				// 	staddressmap.GoogleMaps.infowindow.open(staddressmap.GoogleMaps.map, this);
				// });
				// staddressmap.GoogleMaps.markers.push(staddressmap.GoogleMaps.marker);
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
							fillOpacity: staddressmap.GoogleMaps.radiusopacity,
							fillColor: staddressmap.GoogleMaps.radiuscolor,
							strokeWeight: staddressmap.GoogleMaps.radiusstrokeweight,
							map: staddressmap.GoogleMaps.map
						});
						staddressmap.GoogleMaps.map.fitBounds(staddressmap.GoogleMaps.circle.getBounds());

						var marker = new google.maps.Marker({
							map: staddressmap.GoogleMaps.map,
							position: results[0].geometry.location,
							visible: false
						});

						for (var i = 0; i < staddressmap.GoogleMaps.markers.length;i++) {
							var currentMarker = staddressmap.GoogleMaps.markers[i];
							var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(currentMarker.getPosition(), marker.getPosition());
							var distanceMarkerItem = staddressmap.GoogleMaps.items[i].querySelectorAll(staddressmap.GoogleMaps.distancewrapper)[0];
							if (distanceBetween < radius) {
								bounds.extend(currentMarker.getPosition());
								currentMarker.setMap(staddressmap.GoogleMaps.map);
								console.log(bounds);

								// show element in list
								staddressmap.GoogleMaps.items[i].classList.remove(staddressmap.GoogleMaps.hiddenclassname);

								// add the Distance in the listitem
								distanceMarkerItem.innerHTML = Math.round((distanceBetween / 1000) * 100) / 100 + ' km';
								distanceMarkerItem.classList.add(staddressmap.GoogleMaps.distanceWrapperShowClassname);
							} else {
								// hide marker if not in the radius
								currentMarker.setMap(null);

								// hide element in list
								staddressmap.GoogleMaps.items[i].classList.add(staddressmap.GoogleMaps.hiddenclassname);
								distanceMarkerItem.classList.remove(staddressmap.GoogleMaps.distanceWrapperShowClassname);
							}
						}
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			}
		}
	};

	staddressmap.BingMap.init();
});
