import * as Cesium from "cesium";

import { ThreeOverlay } from "./three-overlay";
import { GaussianSplatLayer } from "./gaussian-splat-layer";

export class Viewer {
  public cesium!: Cesium.Viewer;

  private threeOverlay!: ThreeOverlay;

  constructor() {
    this.createViewer();
    this.createOverlay();

    // call rendering on our three overlay after Cesium is done rendering
    this.cesium.scene.postRender.addEventListener(() => {
      this.threeOverlay.render();
    });
  }

  private createViewer() {
    this.cesium = new Cesium.Viewer("cesium", {
      skyBox: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      animation: false,
      timeline: false,
      navigationHelpButton: false,
      infoBox: false,
      // @ts-ignore
      imageryProvider: false,
    });

    this.cesium.scene.debugShowFramesPerSecond = true;
    this.addOpenStreetMapLayer();
    // this.addTerrainProvider();
    // this.addBaseLayer2();
    this.addBaseLayer();

    // this.addBuildingsLayer();

  }

  // private async addTerrainProvider(): Promise<void> {
  //   const provider = await Cesium.CesiumTerrainProvider.fromUrl(
  //     "https://api.pdok.nl/kadaster/3d-basisvoorziening/ogc/v1_0/collections/digitaalterreinmodel/quantized-mesh",
  //     {
  //       requestVertexNormals: true,
  //     }
  //   );
  //   this.cesium.terrainProvider = provider;
  // }

  private async addOpenStreetMapLayer(): Promise<void> {
    const osm =  new Cesium.OpenStreetMapImageryProvider({
      url : 'https://tile.openstreetmap.org/'
  });

    this.cesium.imageryLayers.addImageryProvider(osm);
  }


  private addBaseLayer(): void {
    const wmsLayer = new Cesium.WebMapServiceImageryProvider({
      url: "https://www.wms.nrw.de/geobasis/wms_nw_dop",
      layers: "nw_dop_rgb", // Specify the correct layer name
      parameters: {
        service: "WMS",
        VERSIOB: "1.3.0",
        REQUEST: "GetMap",
        styles: "", // Leave empty for default style
        format: "image/png", // Ensure this matches the WMS capabilities
        crs: "EPSG:25832", // Coordinate Reference System
        transparent: true, // Optional: Enable transparency
      },
      credit: "Orthophotos NRW - Geobasis NRW",
    });
  
    const a = this.cesium.imageryLayers.addImageryProvider(wmsLayer);
    a.alpha = 0.7;
  }

  private addBaseLayer2(): void {
    var wmtsLayer = new Cesium.WebMapTileServiceImageryProvider({
      url: "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0",
      layer: "Actueel_orthoHR",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "EPSG:3857",
      maximumLevel: 20,
    });

    const b = this.cesium.imageryLayers.addImageryProvider(wmtsLayer);
    b.alpha = 0.5;
  }



  private createOverlay() {
    this.threeOverlay = new ThreeOverlay(this.cesium!.camera);
  }

  public flyTo(
    x: number,
    y: number,
    z: number,
    heading: number,
    pitch: number,
    duration: number
  ): void {
    this.cesium.camera?.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(x, y, z),
      orientation: {
        heading: Cesium.Math.toRadians(heading),
        pitch: Cesium.Math.toRadians(pitch),
        roll: 0.0,
      },
      duration: duration,
    });
  }

  public addGaussianSplatLayer(layer: GaussianSplatLayer): void {
    this.threeOverlay.addGaussianSplatLayer(layer);
  }


}
