import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { StoreService } from "../../../../services/store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  categories: Array<string> = [];
  @Output() showCategory = new EventEmitter<string>();
  category: "all" | string | undefined;
  private categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  onCategoryChange(category: string) {
    if (category === this.category) {
      return;
    }
    this.category = category;
    this.showCategory.emit(category);
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
