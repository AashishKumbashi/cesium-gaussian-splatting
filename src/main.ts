import { GaussianSplatLayer } from "./gaussian-splat-layer";
import { Viewer } from "./viewer";

const viewer = new Viewer();

// function loadArcheryClub() {
//   viewer.flyTo(5.30731, 51.70644, 65.24274, 127.00461, -17.11404, 0);

//   //viewer.flyTo(5.30796, 51.70628, 68.71447, 92.46323, -42.91710, 0);
//   const targetLayer = new GaussianSplatLayer(
//     "./data/target.splat",
//     { lon: 5.308332, lat: 51.706254, height: 50.3 },
//     { x: 1.199285294426387, y: -0.561475491622485, z: 2.430876453678189 }
//   );

//   //viewer.flyTo(5.30742, 51.70615, 68.66736, 92.46323, -42.91710, 0);
//   const buildingLayer = new GaussianSplatLayer(
//     "./data/pb.splat",
//     { lon: 5.30762, lat: 51.70612, height: 50.3 },
//     { x: 1.9586619087229662, y: 0.4766092669791268, z: 2.3042657339892942 }
//   );

//   viewer.addGaussianSplatLayer(targetLayer);
//   viewer.addGaussianSplatLayer(buildingLayer);
// }

function loadArnsberg() {
  // Fly to Arnsberg, Germany (coordinates are approximate)
  viewer.flyTo(8.2175, 51.4172, 50.0, 22.0, -20.0, 5);

  // Add Arnsberg splat
  const arnsbergLayer = new GaussianSplatLayer(
    "./data/arnsberg_2.splat",
    { lon: 8.21835, lat: 51.418199999999985, height: 22.3 },
    {x:-0.017763564277387976,y:0.697643601283958, z:-1.3678085138365412 
    }
  );

  viewer.addGaussianSplatLayer(arnsbergLayer);
}
if (viewer.cesium) {
  // loadArcheryClub();
  loadArnsberg();



 
}
