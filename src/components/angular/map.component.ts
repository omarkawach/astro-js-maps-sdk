import type { OnInit } from "@angular/core";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Map from "@arcgis/core/WebMap.js";

@Component({
  selector: "app-map",
  standalone: true,
  template: `
  @defer {
  <arcgis-map (arcgisViewReadyChange)="arcgisViewReadyChange($event)">
      <arcgis-expand position="bottom-left">
          <arcgis-legend respect-layer-definition-expression></arcgis-legend>
      </arcgis-expand>
  </arcgis-map>
  } @placeholder {
  <calcite-loader label="Loading Map..."></calcite-loader>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements OnInit {
  filter: string = "";

  arcgisViewReadyChange(event: HTMLArcgisMapElement["arcgisViewReadyChange"]) {
    const mapElement = event.target as HTMLArcgisMapElement;
    const expression = this.filter ? `fuel1 = '${this.filter}'` : "1=1";
    const layer = new FeatureLayer({
      portalItem: { id: "a453b9a8ccae4c178ae28621c62307bf" },
      definitionExpression: expression,
    });
    mapElement.map.add(layer);

    layer.when(() => {
      mapElement.extent = layer.fullExtent!;
    });
  }

  async ngOnInit() {
    if (typeof window !== "undefined") {
      await import("@arcgis/map-components/dist/components/arcgis-map");
      await import("@arcgis/map-components/dist/components/arcgis-expand");
      await import("@arcgis/map-components/dist/components/arcgis-legend");

      const urlParams = new URLSearchParams(window.location.search);
      this.filter = urlParams.get("filter") ?? ""; // Get 'filter' from URL

      const mapElement = document.querySelector("arcgis-map");
      if (mapElement) {
        mapElement.map = new Map({
          basemap: "gray-vector",
        });
      }
    }
  }
}