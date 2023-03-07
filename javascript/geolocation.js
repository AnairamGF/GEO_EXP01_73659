import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {Circle as CircleStyle, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {easeOut} from 'ol/easing.js';
import {fromLonLat} from 'ol/proj.js';
import {getVectorContext} from 'ol/render.js';
import {unByKey} from 'ol/Observable.js';

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
        center: [-11311684.159932442,2404379.6937677558],
        zoom: 13,
        multiWorld: true,
    }),
});

function addFixedFeature() {
    const coordinates = [-11311684.159932442,2404379.6937677558];
    const geom = new Point(coordinates);
    const feature = new Feature(geom);
    source.addFeature(feature);
}

function addNewFixedFeature() {
  const coordinates = [-11322443.92342625,2410065.884843269];
  const geom = new Point(coordinates);
  const feature2 = new Feature(geom);
  source.addFeature(feature2);
}

const duration = 3000;
function flash(feature) {
    const start = Date.now();
    const flashGeom = feature.getGeometry().clone();
    const listenerKey = tileLayer.on('postrender', animate);
    
    function animate(event) {
        const frameState = event.frameState;
        const elapsed = frameState.time - start;
        if (elapsed >= duration) {
            unByKey(listenerKey);
            return;
        }
        const vectorContext = getVectorContext(event);
        const elapsedRatio = elapsed / duration;
        // radius will be 5 at start and 30 at end. 
        const radius = easeOut(elapsedRatio) * 25 + 5;
        const opacity = easeOut(1 - elapsedRatio);
        const style = new Style({
            image: new CircleStyle({
                radius: radius,
                stroke: new Stroke({
                    color: 'rgba(255, 0, 0, ' + opacity + ')', 
                    width: 0.25 + opacity,
                }),
            }),
        });
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        // tell OpenLayers to continue postrender animation
        map.render();
    }
}

function flash2(feature) {
  const start = Date.now();
  const flashGeom = feature.getGeometry().clone();
  const listenerKey = tileLayer.on('postrender', animate);
  
  function animate(event) {
      const frameState = event.frameState;
      const elapsed = frameState.time - start;
      if (elapsed >= duration) {
          unByKey(listenerKey);
          return;
      }
      const vectorContext = getVectorContext(event);
      const elapsedRatio = elapsed / duration;
      // radius will be 5 at start and 30 at end. 
      const radius = easeOut(elapsedRatio) * 25 + 5;
      const opacity = easeOut(1 - elapsedRatio);
      const style = new Style({
          image: new CircleStyle({
              radius: radius,
              stroke: new Stroke({
                  color: 'rgba(0, 255, 255, ' + opacity + ')', 
                  width: 0.25 + opacity,
              }),
          }),
      });
      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);
      // tell OpenLayers to continue postrender animation
      map.render();
  }
}

source.on('addfeature', function (e) {
  flash(e.feature);
  flash2(e.feature);
});


addFixedFeature();
addNewFixedFeature();
window.setInterval(addFixedFeature, 5000);
window.setInterval(addNewFixedFeature, 5000);

