var staddressmap=document.querySelectorAll(".staddressmap"),staddressmapsearchfrompoint=document.querySelectorAll(".staddressmap__searchfrompoint"),googelmapwrapper=document.querySelectorAll(".staddressmap__googlemap");requirejs.config({paths:{async:"Vendor/async"},baseUrl:"/typo3conf/ext/st_address_map/Resources/Public/JavaScripts"}),staddressmap.length>0&&(googelmapwrapper.length>0&&require(["googlemaps"]),staddressmapsearchfrompoint.length>0&&require(["googleautocomplete"]));