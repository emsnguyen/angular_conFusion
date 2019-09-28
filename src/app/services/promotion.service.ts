import { PROMOTIONS } from './../shared/promotions';
import { Injectable } from '@angular/core';
import {Promotion} from './../shared/promotion';
// import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions() : Promise<Promotion[]> {
    return new Promise(resolve=> {
      setTimeout(()=>resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id:string): Promise<Promotion> {
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion)=> promotion.id===id)[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion)=> promotion.featured)[0]), 2000);
    });
  }
  
  constructor() { }
}
