import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import { fromLonLat } from 'ol/proj';

const valores = new URLSearchParams(window.location.search);
const name = valores.get("nombre");
const latitude = valores.get("latitud");
const longitude = valores.get("longitud");

const tileLayer = new TileLayer({
    source: new OSM({
      wrapX: false,
    }),
  });
const source = new VectorSource({
   wrapX: false,
});
const vector = new VectorLayer({
  source: source,
});

const map = new Map({
    layers: [tileLayer, vector],
    target: 'map',
    view: new View({
      center: [-11320450.361267474, 2408000.433270685],
      zoom: 13,
      multiWorld: true,
    }),
  });

const ubi1 = new Style({
    image: new CircleStyle({
        radius: 6,
        fill: new Fill({
            color: "blue"
        })
    })
});


const ubi2 = new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: 'red'
      })
    })
  });

getLocation();
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const x = position.coords.longitude;
        const y = position.coords.latitude;
        const geom = new Point(fromLonLat([x, y]));
        const feature = new Feature(geom);
        feature.setStyle(ubi1);
        source.addFeature(feature);
      });
    } 
}

console.log(latitude)
console.log(longitude)

const msg = document.getElementById("nombre");
msg.textContent = "¡Hola " + name + "! Tu pedido está en camino"
  
findLocation(longitude, latitude);
function findLocation(longitude, latitude){
   const x = longitude;
   const y = latitude;
   const geom = new Point(fromLonLat([x, y]));
   const featureAdd = new Feature(geom);
   featureAdd.setStyle(ubi2);
   source.addFeature(featureAdd);
}

//-11322443.92342625,2410065.884843269
//-11311684.159932442, 2404379.6937677558
