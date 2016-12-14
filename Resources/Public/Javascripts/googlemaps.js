define(["googlemaps","async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBxSk_ZAKOJlPzMRSpnTXVuTnftFTwpfTA&callback=initMap&libraries=places,geometry"],function(){"use strict";var e={location:window.location,GoogleMaps:{hiddenclassname:"staddressmap__hiddenlistitem",distancewrapper:".staddressmap__distance",distanceWrapperShowClassname:"staddressmap__distance--show",radiuscolor:"#FF0000",radiusopacity:.35,radiusstrokeweight:0,map:null,circle:null,marker:null,markers:[],infowindow:null,items:document.querySelectorAll("[data-mapmarkeritem]"),markercontent:document.querySelectorAll("[data-mapmarkercontent]"),element:document.querySelectorAll(".staddressmap__googlemap")[0],searchfrompoint:document.querySelectorAll(".staddressmap__searchfrompoint")[0],searchradius:document.querySelectorAll(".staddressmap__searchradius")[0],searchsubmit:document.querySelectorAll(".staddressmap__searchsubmit")[0],searchreset:document.querySelectorAll(".staddressmap__searchreset")[0],init:function(){e.GoogleMaps.items.length&&(google.maps.event.addDomListener(window,"load",e.GoogleMaps.initializeGoogleMaps()),google.maps.event.addDomListener(window,"resize",function(){var o=e.GoogleMaps.map.getCenter();google.maps.event.trigger(e.GoogleMaps.map,"resize"),e.GoogleMaps.map.setCenter(o)}),e.GoogleMaps.searchsubmit.addEventListener("click",function(){e.GoogleMaps.createRadius()}),e.GoogleMaps.searchreset.addEventListener("click",function(){e.GoogleMaps.createMarkers()}))},initializeGoogleMaps:function(){e.GoogleMaps.map=new google.maps.Map(e.GoogleMaps.element),e.GoogleMaps.infowindow=new google.maps.InfoWindow({size:new google.maps.Size(150,50)}),e.GoogleMaps.createMarkers()},createMarkers:function(){for(var o=0;o<e.GoogleMaps.items.length;o++)e.GoogleMaps.items[o].classList.remove(e.GoogleMaps.hiddenclassname);var a=new google.maps.LatLngBounds;e.GoogleMaps.items.forEach(function(o,s){var t=o.getAttribute("data-staddressmap-latitude"),l=o.getAttribute("data-staddressmap-longitude"),r=o.getAttribute("data-staddressmap-markertitle"),n=e.GoogleMaps.markercontent[s],i=new google.maps.LatLng(t,l);e.GoogleMaps.createMarker(i,r,n),a.extend(i),0===s&&e.GoogleMaps.map.setCenter(i),s++}),0<e.GoogleMaps.markers.length&&e.GoogleMaps.map.fitBounds(a)},createMarker:function(o,a,s){e.GoogleMaps.marker=new google.maps.Marker({position:o,map:e.GoogleMaps.map,title:a,zIndex:Math.round(o.lat()*-1e5)<<5}),e.GoogleMaps.marker.myname=a,google.maps.event.addListener(e.GoogleMaps.marker,"click",function(){e.GoogleMaps.infowindow.setContent(s),e.GoogleMaps.infowindow.open(e.GoogleMaps.map,this)}),e.GoogleMaps.markers.push(e.GoogleMaps.marker)},setMapOnAll:function(o){for(var a=0;a<e.GoogleMaps.markers.length;a++)e.GoogleMaps.markers[a].setMap(o)},clearMarkers:function(){e.GoogleMaps.setMapOnAll(null)},createRadius:function(){var o=e.GoogleMaps.searchfrompoint.value,a=1e3*parseInt(e.GoogleMaps.searchradius.value,10);e.GoogleMaps.clearMarkers(null);var s=new google.maps.Geocoder,t=new google.maps.LatLngBounds;s.geocode({address:o},function(o,s){if(s===google.maps.GeocoderStatus.OK){e.GoogleMaps.map.setCenter(o[0].geometry.location),e.GoogleMaps.circle&&e.GoogleMaps.circle.setMap(null),e.GoogleMaps.circle=new google.maps.Circle({center:o[0].geometry.location,radius:a,fillOpacity:e.GoogleMaps.radiusopacity,fillColor:e.GoogleMaps.radiuscolor,strokeWeight:e.GoogleMaps.radiusstrokeweight,map:e.GoogleMaps.map}),e.GoogleMaps.map.fitBounds(e.GoogleMaps.circle.getBounds());for(var l=new google.maps.Marker({map:e.GoogleMaps.map,position:o[0].geometry.location,visible:!1}),r=0;r<e.GoogleMaps.markers.length;r++){var n=e.GoogleMaps.markers[r],i=google.maps.geometry.spherical.computeDistanceBetween(n.getPosition(),l.getPosition()),p=e.GoogleMaps.items[r].querySelectorAll(e.GoogleMaps.distancewrapper)[0];i<a?(t.extend(n.getPosition()),n.setMap(e.GoogleMaps.map),console.log(t),e.GoogleMaps.items[r].classList.remove(e.GoogleMaps.hiddenclassname),p.innerHTML=Math.round(i/1e3*100)/100+" km",p.classList.add(e.GoogleMaps.distanceWrapperShowClassname)):(n.setMap(null),e.GoogleMaps.items[r].classList.add(e.GoogleMaps.hiddenclassname),p.classList.remove(e.GoogleMaps.distanceWrapperShowClassname))}}else alert("Geocode was not successful for the following reason: "+s)})}}};e.GoogleMaps.init()});