import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  sort: "asc" | "desc" = "desc";
  itemsShowCount = 12;
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<"asc" | "desc">();

  constructor() {}

  ngOnInit(): void {}

  onSortUpdate(newSort: "asc" | "desc") {
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  onItemUpdated(count: number) {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(this.itemsShowCount);
  }

  onColumnsUpdated(colsNum: number) {
    this.columnsCountChange.emit(colsNum);
  }
}
