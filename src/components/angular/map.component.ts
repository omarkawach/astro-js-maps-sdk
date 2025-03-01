import type { OnInit } from "@angular/core";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from "@angular/core";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

@Component({
  selector: "app-map",
  standalone: true,
  template:
    `@defer {
    <arcgis-map
      #myMap
      basemap="gray-vector"
      (arcgisViewReadyChange)="arcgisViewReadyChange($event)"
    >
      <arcgis-expand position="bottom-left">
        <arcgis-legend respect-layer-definition-expression></arcgis-legend>
      </arcgis-expand>
    </arcgis-map>
  } @placeholder {
    <calcite-loader label="Loading Map..."></calcite-loader>
  }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements OnInit {
  @Input() filter: string = "";

  arcgisViewReadyChange(event: HTMLArcgisMapElement["arcgisViewReadyChange"]) {
    const element = event.target;
    const expression = this.filter ? `fuel1 = '${this.filter}'` : "1=1";
    const layer = new FeatureLayer({
      portalItem: { id: "a453b9a8ccae4c178ae28621c62307bf" },
      definitionExpression: expression,
    });

    element.addLayer(layer);

    layer.when(() => {
      element.extent = layer.fullExtent!;
    });
  }

  async ngOnInit() {
    if (typeof window !== "undefined") {
      // Dynamically import ArcGIS components to avoid SSR issues
      await import("@arcgis/map-components/dist/components/arcgis-expand");
      await import("@arcgis/map-components/dist/components/arcgis-legend");
      await import("@arcgis/map-components/dist/components/arcgis-map");
      await import("@arcgis/map-components/dist/components/arcgis-search");
      await import("@arcgis/map-components/dist/components/arcgis-zoom");
    }
  }
}