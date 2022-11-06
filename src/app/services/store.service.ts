import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getProducts(
    limit = 12,
    sort: "asc" | "desc" = "desc",
    category?: string
  ): Observable<Array<Product>> {
    const queries = new URLSearchParams({ limit: String(limit), sort });
    const url = `${STORE_BASE_URL}/products${
      category ? `/category/${category}` : ""
    }`;
    return this.httpClient.get<Array<Product>>(`${url}?${queries}`);
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}
