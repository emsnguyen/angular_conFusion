import { ProcessHttpMsgService } from "./process-http-msg.service";
import { baseURL } from "./../shared/baseurl";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(baseURL + "dishes")
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + "dishes/" + id)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(baseURL + "dishess?featured=true")
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http
      .put<Dish>(baseURL + "dishes/" + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
