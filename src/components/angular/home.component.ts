import type { OnInit } from "@angular/core";
import { StateService } from "./service/state.service";
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  template:
    `
  @defer (on timer(500ms)) {
    <calcite-list label="Power Plants" scale="l" selection-mode="single">
      @for (item of items; track item) {
        <calcite-list-item [label]="item" [value]="item" (click)="navigateToMap(item)"></calcite-list-item>
      }
    </calcite-list>
  } @placeholder {
    <calcite-loader label="Loading Power Plants..."></calcite-loader>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StateService],
})
export class HomeComponent implements OnInit {
  items: string[] = [];
  selectedItem: string | null = null;

  private readonly stateService = inject(StateService);

  navigateToMap(item: string) {
    this.selectedItem = item;
    this.stateService.setFilter(this.selectedItem);
    window.location.href = `/map?filter=${encodeURIComponent(item)}`;
  }

  async loadData() {
    const { types } = await this.stateService.loadData();
    this.items = types;
  }

  async ngOnInit() {
    await import("@esri/calcite-components/components/calcite-action");
    await import("@esri/calcite-components/components/calcite-alert");
    await import("@esri/calcite-components/components/calcite-list");
    await import("@esri/calcite-components/components/calcite-list-item");
    await import("@esri/calcite-components/components/calcite-loader");
    this.loadData();
  }
}
