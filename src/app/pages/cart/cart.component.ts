import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };
  dataSource: Array<CartItem> = [];
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private _cartService: CartService,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });

    document.title = "Cart | Fancy Store";
  }

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

  onClearCart() {
    this._cartService.clearCart();
  }

  onRemoveFromCart(id: number) {
    this._cartService.removeFromCart(id);
  }

  onAddQuantity(item: CartItem) {
    this._cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem) {
    this._cartService.removeQuantity(item.id);
  }

  onCheckout() {
    this._httpClient
      .post("http://localhost:4242/checkout", this.cart)
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51M1E3zIogPD1WRLZzJmhOEPIRrIIxx1bDSITzMGheYN0PVtJolY7GQRrYREgYFZYOniP9CCRVi6H2d5Q2CwydIKu00Bfe65Phn"
        );
        stripe?.redirectToCheckout({ sessionId: res.id });
      });
  }
}
