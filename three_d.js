var map, view, bm;

require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/MapImageLayer",
  "esri/widgets/BasemapToggle",
  "dojo/domReady!"
], function (Map, SceneView, MapImageLayer, BasemapToggle) {
    map = new Map({
        basemap: "hybrid",
        ground: "world-elevation"
    });

    var layer = new MapImageLayer({
        url: "https://arcgis.ami-lab.org/arcgis/rest/services/NUSMap2017/NUSMap2017CartographyPreview/MapServer"
    });
    map.add(layer);  // adds the layer to the map

    view = new SceneView({
        container: "viewDiv",     // Reference to the scene div created in step 5
        map: map,                 // Reference to the map object created before the scene
        scale: 50000000,          // Sets the initial scale to 1:50,000,000
        center: [-101.17, 21.78]  // Sets the center point of view with lon/lat
    });

    var basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: bm
    });

    //rotate globe on mobile
    window.addEventListener("deviceorientation", function (event) {
        view.goTo({
            // process event.alpha, event.beta and event.gamma
            target: view.graphics,
            heading: event.beta,
            tilt: event.gamma
        });
    }, true);

    //navigate with w/s/r keys
    window.addEventListener("keypress", function (event) {

        if (event.keyCode == 87 || event.keyCode == 119) {
            view.zoom += 0.1;
        }
        else if (event.keyCode == 115 || event.keyCode == 28) {
            view.zoom -= 0.1;
        }
        else if (event.keyCode == 114) {
            view.goTo({
                target: view.graphics,
                heading: 0,
                tilt: 0
            });
        }

        else if (event.keyCode == 104) { //h
            view.goTo({
                center: [103.828987, 1.434507],
                heading: 0,
                tilt: 0
            });
        }

        else if (event.keyCode == 101) { //e
            view.goTo({
                center: [9.3201, 48.7433],
                heading: 0,
                tilt: 0
            });
        }


    }, true);

    setInterval(
    function () { document.getElementById("center").innerHTML = "[ Lat: " + view.center.latitude.toFixed(1) + ", Long: " + view.center.longitude.toFixed(1) + " ]" }
	, 500);

});

function setBasemap() {
    bm = document.getElementById("bm").value;
}
