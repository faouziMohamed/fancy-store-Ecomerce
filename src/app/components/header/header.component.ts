import { Component, Input, OnInit } from "@angular/core";
import { Cart, CartItem } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  itemsQuantity: number = 0;

  constructor(private _cartService: CartService) {}

  private _cart: Cart = { items: [] };

  @Input() get cart(): Cart {
    return this._cart;
  }

  set cart(value: Cart) {
    this._cart = value;
    this.itemsQuantity = this._cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  ngOnInit(): void {}

  getTotal(items: Array<CartItem>) {
    return this._cartService.getTotal(items);
  }

  onClearCart() {
    this._cartService.clearCart();
  }
}
