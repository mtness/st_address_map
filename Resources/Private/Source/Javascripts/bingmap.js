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

			init: function() {
				staddressmap.BingMap.map = new Microsoft.Maps.Map(staddressmap.BingMap.element, {
					credentials: 'AoaPK47y-Kxe6t_cmrtFWDQzCjOGaJMofONHzpy3WCkf9RXaQuATQSv99rYjwxu0'
				});

				// TODO INFO: http://www.bing.com/api/maps/sdkrelease/mapcontrol/isdk#addDefaultInfobox+JS
				// TODO INFO: https://msdn.microsoft.com/en-us/library/mt750265.aspx
				// TODO INFO: http://stackoverflow.com/questions/7663993/multiple-pushpin-with-infobox-in-bing-map
				staddressmap.BingMap.createMarkers();
			},

			/**
			 * create the maps makers
			 */
			createMarkers: function() {
				for (var i = 0; i < staddressmap.BingMap.items.length;i++) {
					staddressmap.BingMap.items[i].classList.remove(staddressmap.BingMap.hiddenclassname);
				}

				// Creates a collection to store multiple pins
				staddressmap.BingMap.markers = new Microsoft.Maps.EntityCollection();
				staddressmap.BingMap.infowindow = new Microsoft.Maps.EntityCollection();

				// var bounds = new google.maps.LatLngBounds();
				staddressmap.BingMap.items.forEach(function(item, i) {
					var lat = item.getAttribute('data-staddressmap-latitude');
					var lng = item.getAttribute('data-staddressmap-longitude');

					var markertitle = item.getAttribute('data-staddressmap-markertitle');
					var markercontent = staddressmap.BingMap.markercontent[i];
					var position = new Microsoft.Maps.Location(lat, lng);
					// var infobox = new Microsoft.Maps.Infobox(position, {
					// 	title: markertitle,
					// 	description: 'teste',
					// 	visible: true
					// });
					console.log(markertitle);
					console.log(staddressmap.BingMap.infowindowTemplate.replace('{title}', markertitle).replace('{description}', markercontent));
					var infobox = new Microsoft.Maps.Infobox(position, {
						htmlContent: staddressmap.BingMap.infowindowTemplate.replace('{title}', markertitle).replace('{description}', markercontent),
						visible: true
					});
					infobox.setMap(staddressmap.BingMap.map);
					staddressmap.BingMap.markers.push(new Microsoft.Maps.Pushpin(position));
					staddressmap.BingMap.infowindow.push(infobox);
					i++;
				});

				// Markers to Marker
				staddressmap.BingMap.createMarker();
			},

			/**
			 * add the markers in the Map
			 */
			createMarker: function() {
				staddressmap.BingMap.map.entities.push(staddressmap.BingMap.markers);
				staddressmap.BingMap.map.entities.push(staddressmap.BingMap.infowindow);
			},

			createRadius: function() {
			}
		}
	};

	staddressmap.BingMap.init();
});
