import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { StoreService } from "../../services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: "all" | string | undefined;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> = [];
  sort: "asc" | "desc" = "desc";
  productsSubscription: Subscription | undefined;
  count = 12;
  categories: Array<string> = [];

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();

    // set page title
    document.title = "Home | Fancy Store";
  }

  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onCategoryChange(newCategory: string) {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(newProduct: Product) {
    this.cartService.addToCart({
      id: newProduct.id,
      product: newProduct.image,
      name: newProduct.title,
      price: newProduct.price,
      quantity: 1,
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onItemsCountChange(itemCount: number) {
    this.count = itemCount;
    this.getProducts();
  }

  onSortChange(sort: "asc" | "desc") {
    this.sort = sort;
    this.getProducts();
  }

  private getProducts() {
    this.productsSubscription = this.storeService
      .getProducts(
        this.count,
        this.sort,
        this.category === "all" ? undefined : this.category
      )
      .subscribe((_products) => (this.products = _products));
  }

  private getCategories() {
    this.storeService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
