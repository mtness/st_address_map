define(["bingmap","async!https://www.bing.com/api/maps/mapcontrol?branch=experimental"],function(){"use strict";var e={location:window.location,BingMap:{hiddenclassname:"staddressmap__hiddenlistitem",distancewrapper:".staddressmap__distance",distanceWrapperShowClassname:"staddressmap__distance--show",radiuscolor:"#FF0000",radiusopacity:.35,radiusstrokeweight:0,map:null,circle:null,marker:null,markers:null,infowindow:null,infowindowTemplate:document.querySelectorAll(".staddressmap__bingmapinfobox")[0].outerHTML,items:document.querySelectorAll("[data-mapmarkeritem]"),markercontent:document.querySelectorAll("[data-mapmarkercontent]"),element:document.querySelectorAll(".staddressmap__map")[0],searchfrompoint:document.querySelectorAll(".staddressmap__searchfrompoint")[0],searchradius:document.querySelectorAll(".staddressmap__searchradius")[0],searchsubmit:document.querySelectorAll(".staddressmap__searchsubmit")[0],searchreset:document.querySelectorAll(".staddressmap__searchreset")[0],init:function(){e.BingMap.map=new Microsoft.Maps.Map(e.BingMap.element,{credentials:"AoaPK47y-Kxe6t_cmrtFWDQzCjOGaJMofONHzpy3WCkf9RXaQuATQSv99rYjwxu0"}),e.BingMap.createMarkers()},createMarkers:function(){for(var a=0;a<e.BingMap.items.length;a++)e.BingMap.items[a].classList.remove(e.BingMap.hiddenclassname);e.BingMap.markers=new Microsoft.Maps.EntityCollection,e.BingMap.infowindow=new Microsoft.Maps.EntityCollection,e.BingMap.items.forEach(function(a,t){var n=a.getAttribute("data-staddressmap-latitude"),r=a.getAttribute("data-staddressmap-longitude"),i=a.getAttribute("data-staddressmap-markertitle"),s=e.BingMap.markercontent[t],o=new Microsoft.Maps.Location(n,r),p=new Microsoft.Maps.Infobox(o,{htmlContent:e.BingMap.infowindowTemplate.replace("###title###",i).replace("###description###",s.innerHTML),visible:!1});p.setMap(e.BingMap.map),e.BingMap.markers.push(new Microsoft.Maps.Pushpin(o)),e.BingMap.infowindow.push(p),t++}),e.BingMap.createMarker()},createMarker:function(){e.BingMap.map.entities.push(e.BingMap.markers),e.BingMap.map.entities.push(e.BingMap.infowindow)},createRadius:function(){}}};e.BingMap.init()});