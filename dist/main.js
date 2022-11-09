        
		var map = L.map('map', {
            center: [33.947100565100584, -118.26552369657428],
            zoom: 11,
            zoomControl:false,
            measureControl: false
        });
        L.control.zoom(
            {position:'topright'}
        ).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        //add map scale
        L.control.scale().addTo(map);


        //map coordinate display
        map.on('mousemove', function (e) {
            console.log(e)
            $('.coordinate').html(`Lat: ${e.latlng.lat} Long: ${e.latlng.lng}`)
        })


var greenMarker = {
  radius: 8,
  fillColor: "#69FF33"
};
var redMarker = {
  radius: 8,
  fillColor: "#ff0000"
  }

        //geojson load
        // L.geoJSON(data).addTo(map);
        var points = L.geoJSON(data, {
			  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, greenMarker);
  },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip('<p>Name: '+feature.properties.Name+'<br>Ethnicity: ' +feature.properties.Ethnicity+ '</p>' )
				
            }
        });
points.addTo(map);
	



		//Indian Restaurants
		        var points2 = L.geoJSON(data2, { 
				  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, redMarker);
  },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip('<p>Name: '+feature.properties.Name+'<br>Ethnicity: ' +feature.properties.Ethnicity+ '</p>' )
				
            }
        }).addTo(map);





        //basemaps
        var Topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

        var Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 18,
            ext: 'png'
        });

        var StreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        });

        var Imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        var Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });

        var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        });

        //leaflet layer control
        var baseMaps = {
            'Open Street Map': OSM,
            'Topology': Topo,
            'Terrain': Terrain,
            'ESRI Street': StreetMap,
            'ESRI Imagery': Imagery,
            'Carto Positron': Positron
        }

        var featureLayers = {
            'Japanese Restaurants': points,
			'Indian Restaurants': points2
        }

        L.control.layers(baseMaps, featureLayers, {collapsed: false, position: 'topleft'}).addTo(map);

