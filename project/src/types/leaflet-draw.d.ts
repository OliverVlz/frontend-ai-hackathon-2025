// src/types/leaflet-draw.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    class Draw extends L.Control {
      constructor(options?: any);
    }
  }

  namespace DrawEvents {
    interface Created {
      layerType: string;
      layer: L.Layer;
    }
  }

  namespace Draw {
    interface Options {
      draw: {
        polygon?: boolean;
        marker?: boolean;
        polyline?: boolean;
        rectangle?: boolean;
        circle?: boolean;
        circlemarker?: boolean;
      };
      edit: {
        featureGroup: L.FeatureGroup;
      };
    }

    const Event: {
      CREATED: string;
      EDITED: string;
      DELETED: string;
      START: string;
      STOP: string;
      ACTION: string;
      DRAWSTART: string;
      DRAWSTOP: string;
      DRAWACTION: string;
      DRAW: string;
    };
  }
}
