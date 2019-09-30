import { ProcessHttpMsgService } from "./process-http-msg.service";
import { HttpClient } from "@angular/common/http";
import { PROMOTIONS } from "./../shared/promotions";
import { Injectable } from "@angular/core";
import { Promotion } from "./../shared/promotion";
import { of, Observable } from "rxjs";
import { delay, catchError, map } from "rxjs/operators";
import { baseURL } from "../shared/baseurl";
@Injectable({
  providedIn: "root"
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}
  getPromotions(): Observable<Promotion[]> {
    return this.http
      .get<Promotion[]>(baseURL + "promotions")
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseURL + "promotions/" + id)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseURL + "promotions?featured=true")
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
