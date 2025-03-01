import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { executeQueryJSON } from "@arcgis/core/rest/query";

const PLANT_URL =
  "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/PowerPlants_WorldResourcesInstitute/FeatureServer/0";

export type Data = {
  types: string[];
};

@Injectable({
  providedIn: "root",
})
export class StateService {
  private filterSubject = new Subject<string>();

  filter$ = this.filterSubject.asObservable();

  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }

  constructor() {}

  async loadData(): Promise<Data> {
    const query = {
      outFields: ["fuel1"],
      where: "1=1",
      returnDistinctValues: true,
      returnGeometry: false,
    };
    const results = await executeQueryJSON(PLANT_URL, query);
    const values = results.features
      .map((feature) => feature.attributes["fuel1"])
      .filter(Boolean)
      .sort();
    return { types: values };
  }
}