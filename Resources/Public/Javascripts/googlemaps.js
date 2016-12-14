define(["googlemaps","markerclusterer","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBxSk_ZAKOJlPzMRSpnTXVuTnftFTwpfTA&callback=initMap&libraries=places,geometry"],function(){"use strict";var e={location:window.location,GoogleMaps:{map:null,circle:null,marker:null,markerCluster:null,markers:[],infowindow:null,items:document.querySelectorAll("[data-mapmarkeritem]"),markercontent:document.querySelectorAll("[data-mapmarkercontent]"),element:document.querySelectorAll(".staddressmap__googlemap")[0],searchfrompoint:document.querySelectorAll(".staddressmap__searchfrompoint")[0],searchradius:document.querySelectorAll(".staddressmap__searchradius")[0],searchsubmit:document.querySelectorAll(".staddressmap__searchsubmit")[0],markerclusteroptions:[],init:function(){e.GoogleMaps.items.length&&(e.GoogleMaps.markerclusteroptions={imagePath:"/typo3conf/ext/st_address_map/Resources/Public/Icons/m"},google.maps.event.addDomListener(window,"load",e.GoogleMaps.initializeGoogleMaps()),google.maps.event.addDomListener(window,"resize",function(){var o=e.GoogleMaps.map.getCenter();google.maps.event.trigger(e.GoogleMaps.map,"resize"),e.GoogleMaps.map.setCenter(o)}),e.GoogleMaps.searchsubmit.addEventListener("click",function(){e.GoogleMaps.createRadius()}))},initializeGoogleMaps:function(){e.GoogleMaps.map=new google.maps.Map(e.GoogleMaps.element),e.GoogleMaps.infowindow=new google.maps.InfoWindow({size:new google.maps.Size(150,50)}),e.GoogleMaps.createMarkers()},createMarkers:function(){var o=new google.maps.LatLngBounds;e.GoogleMaps.items.forEach(function(a,s){var r=a.getAttribute("data-staddressmap-latitude"),t=a.getAttribute("data-staddressmap-longitude"),l=a.getAttribute("data-staddressmap-markertitle"),n=e.GoogleMaps.markercontent[s],p=new google.maps.LatLng(r,t);e.GoogleMaps.createMarker(p,l,n),o.extend(p),0===s&&e.GoogleMaps.map.setCenter(p),s++}),0<e.GoogleMaps.markers.length&&(e.GoogleMaps.map.fitBounds(o),e.GoogleMaps.markerCluster=new MarkerClusterer(e.GoogleMaps.map,e.GoogleMaps.markers,e.GoogleMaps.markerclusteroptions))},createMarker:function(o,a,s){e.GoogleMaps.marker=new google.maps.Marker({position:o,map:e.GoogleMaps.map,title:a,zIndex:Math.round(o.lat()*-1e5)<<5}),e.GoogleMaps.marker.myname=a,google.maps.event.addListener(e.GoogleMaps.marker,"click",function(){e.GoogleMaps.infowindow.setContent(s),e.GoogleMaps.infowindow.open(e.GoogleMaps.map,this)}),e.GoogleMaps.markers.push(e.GoogleMaps.marker)},setMapOnAll:function(o){for(var a=0;a<e.GoogleMaps.markers.length;a++)e.GoogleMaps.markers[a].setMap(o)},clearMarkers:function(){e.GoogleMaps.setMapOnAll(null)},createRadius:function(){var o=e.GoogleMaps.searchfrompoint.value,a=1e3*parseInt(e.GoogleMaps.searchradius.value,10);e.GoogleMaps.clearMarkers(null),e.GoogleMaps.markerCluster.clearMarkers();var s=new google.maps.Geocoder,r=new google.maps.LatLngBounds;s.geocode({address:o},function(o,s){if(s===google.maps.GeocoderStatus.OK){e.GoogleMaps.map.setCenter(o[0].geometry.location),e.GoogleMaps.circle&&e.GoogleMaps.circle.setMap(null),e.GoogleMaps.circle=new google.maps.Circle({center:o[0].geometry.location,radius:a,fillOpacity:.35,fillColor:"#FF0000",map:e.GoogleMaps.map}),e.GoogleMaps.map.fitBounds(e.GoogleMaps.circle.getBounds());for(var t=new google.maps.Marker({map:e.GoogleMaps.map,position:o[0].geometry.location,visible:!1}),l=0;l<e.GoogleMaps.markers.length;l++)google.maps.geometry.spherical.computeDistanceBetween(e.GoogleMaps.markers[l].getPosition(),t.getPosition())<a?(r.extend(e.GoogleMaps.markers[l].getPosition()),e.GoogleMaps.markers[l].setMap(e.GoogleMaps.map)):e.GoogleMaps.markers[l].setMap(null)}else alert("Geocode was not successful for the following reason: "+s)})}}};e.GoogleMaps.init()});