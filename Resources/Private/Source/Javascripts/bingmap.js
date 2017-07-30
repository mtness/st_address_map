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
			 * Marker object
			 */
			marker: null,

			/**
			 * Markers object
			 */
			markers: null,

			/**
			 * Info window object
			 */
			infowindow: null,

			/**
			 * Info window object
			 */
			infowindowTemplate: document.querySelectorAll('.staddressmap__bingmapinfobox')[0].outerHTML,

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

			/**
			 * Mapwarpper object
			 */
			mapObject: document.querySelectorAll('.staddressmap')[0],

			/**
			 * autoZoom string
			 */
			autoZoom: 'data-staddressmap-autozoom',

			/**
			 * clusterMarkers object
			 */
			clusterMarkers: [],

			/**
			 * locationArray object
			 */
			locationArray: [],

			/**
			 * clusteringDataAttribute string
			 */
			clusteringDataAttribute: 'data-staddressmap-clustering',

			/**
			 * clusterGridSize int
			 */
			clusterGridSize: 100,

			init: function() {
				staddressmap.BingMap.map = new Microsoft.Maps.Map(staddressmap.BingMap.element, {
					credentials: 'AoaPK47y-Kxe6t_cmrtFWDQzCjOGaJMofONHzpy3WCkf9RXaQuATQSv99rYjwxu0'
				});

				// Use a trottled event to reduce the number of unwanted events being fired.
				// Microsoft.Maps.Events.addThrottledHandler(historymap.BingMap.map, 'viewchangeend', historymap.BingMap.createMarkers, 250);

				staddressmap.BingMap.initInfowindow();

				staddressmap.BingMap.createMarkers();

				// cluster the marker
				if ('1' === staddressmap.BingMap.mapObject.getAttribute(staddressmap.BingMap.clusteringDataAttribute)) {
					staddressmap.BingMap.clusterTheMarkers();
				} else {
					// Markers to Marker
					staddressmap.BingMap.createMarker();
				}

				if (staddressmap.BingMap.mapObject.getAttribute(staddressmap.BingMap.autoZoom) === '1') {
					// Zoom map fit to markers
					var bestview = Microsoft.Maps.LocationRect.fromLocations(staddressmap.BingMap.locationArray);
					staddressmap.BingMap.map.setView({
						bounds: bestview,
						padding: 80
					});
				} else {
					// TODO: center nicht nur vom ersten element nutzen, sondern die mitte alle Elemente, oder händisch
					staddressmap.BingMap.map.setView({
						zoom: 17,
						center: staddressmap.BingMap.locationArray[0]
					});
				}
			},

			/**
			 * create the maps makers
			 */
			createMarkers: function() {
				// Creates a collection to store multiple pins
				staddressmap.BingMap.markers = new Microsoft.Maps.EntityCollection();

				// var bounds = new google.maps.LatLngBounds();
				Array.prototype.forEach.call (staddressmap.BingMap.items, function(item, i) {
					var lat = item.getAttribute('data-staddressmap-latitude');
					var lng = item.getAttribute('data-staddressmap-longitude');

					var markertitle = item.getAttribute('data-staddressmap-markertitle');
					var markercontent = staddressmap.BingMap.markercontent[i];
					var position = new Microsoft.Maps.Location(lat, lng);
					var marker = new Microsoft.Maps.Pushpin(position);

					// Store some metadata with the pushpin.
					marker.metadata = {
						markerid: i,
						title: markertitle,
						description: markercontent.innerHTML
					};
					Microsoft.Maps.Events.addHandler(marker, 'click', staddressmap.BingMap.openInfoWindow);
					staddressmap.BingMap.markers.push(marker);
					staddressmap.BingMap.clusterMarkers.push(marker);
					staddressmap.BingMap.locationArray.push(position);
					i++;
				});
			},

			/**
			 * add the markers in the Map
			 */
			createMarker: function() {
				staddressmap.BingMap.map.entities.push(staddressmap.BingMap.markers);
			},

			/**
			 * initial the infowindow
			 */
			initInfowindow: function() {
				staddressmap.BingMap.infowindow = new Microsoft.Maps.Infobox(staddressmap.BingMap.map.getCenter(), {
					visible: false,
					offset: new Microsoft.Maps.Point(-125, 16)
				});

				staddressmap.BingMap.infowindow.setMap(staddressmap.BingMap.map);
			},

			createRadius: function() {
			},

			openInfoWindow: function(e) {
				staddressmap.BingMap.map.setView({ center: e.location});

				if (e.target.metadata) {
					staddressmap.BingMap.infowindow.setOptions({
						height: 300,
						width: 400,
						zIndex: 1,
						showPointer: false,
						htmlContent: staddressmap.BingMap.infowindowTemplate
								.replace(
										'###title###',
										e.target.metadata.title)
								.replace(
										'###description###',
										e.target.metadata.description
								),
						visible: true
					});
					staddressmap.BingMap.infowindow.setLocation(e.target.getLocation());
				}
			},

			clusterTheMarkers: function() {
				Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function() {
					var clusterLayer = new Microsoft.Maps.ClusterLayer(staddressmap.BingMap.clusterMarkers, {
						clusteredPinCallback: staddressmap.BingMap.createCustomClusteredPin,
						gridSize: staddressmap.BingMap.clusterGridSize
					});
					staddressmap.BingMap.map.layers.insert(clusterLayer);
				});
			},

			createCustomClusteredPin: function(cluster) {
				// Define variables for minimum cluster radius, and how wide the outline area of the circle should be.
				var minRadius = 12;
				var outlineWidth = 4;

				// Get the number of pushpins in the cluster
				var clusterSize = cluster.containedPushpins.length;

				// Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
				var radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;

				// Default cluster color is red.
				var fillColor = 'rgba(255, 40, 40, 0.5)';

				if (clusterSize < 10) {
					// Make the cluster green if there are less than 10 pushpins in it.
					fillColor = 'rgba(183, 36, 42, 0.5)';
				} else if (clusterSize < 100) {
					// Make the cluster yellow if there are 10 to 99 pushpins in it.
					fillColor = 'rgba(0, 178, 51, 0.5)';
				}

				// Create an SVG string of two circles, one on top of the other, with the specified radius and color.
				var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2), '" height="', (radius * 2), '">',
					'<circle cx="', radius, '" cy="', radius, '" r="', radius, '" fill="', fillColor, '"/>',
					'<circle cx="', radius, '" cy="', radius, '" r="', radius - outlineWidth, '" fill="', fillColor, '"/>',
					'</svg>'];

				// Customize the clustered pushpin using the generated SVG and anchor on its center.
				cluster.setOptions({
					icon: svg.join(''),
					anchor: new Microsoft.Maps.Point(radius, radius),
					textOffset: new Microsoft.Maps.Point(0, radius - 8) // Subtract 8 to compensate for height of text.
				});

				Microsoft.Maps.Events.addHandler(cluster, 'click', staddressmap.BingMap.zoomToClickedCluster);
			},

			zoomToClickedCluster: function(e) {
				if (e.target.containedPushpins) {
					var locs = [];
					for (var i = 0, len = e.target.containedPushpins.length; i < len; i++) {
						// Get the location of each pushpin.
						locs.push(e.target.containedPushpins[i].getLocation());
					}

					// Create a bounding box for the pushpins.
					var bounds = Microsoft.Maps.LocationRect.fromLocations(locs);

					// Zoom into the bounding box of the cluster.
					// Add a padding to compensate for the pixel area of the pushpins.
					staddressmap.BingMap.map.setView({ bounds: bounds, padding: 100 });
				}
			}
		}
	};

	staddressmap.BingMap.init();
});
