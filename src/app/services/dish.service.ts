import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  dish:Dish;
  constructor() { }

  getDishes() :Dish[]{
    return DISHES;
  }

  getDish(id:string) : Dish{
    return DISHES.filter((dish)=>{
      dish.id===id;
    })[0];
  }

  getFeaturedDish() :Dish {
    console.log(DISHES.filter((dish)=> {dish.featured})[0]);
    console.log(DISHES.filter((dish)=> dish.featured)[0]);
    return DISHES.filter((dish)=> dish.featured)[0];
    // console.log(this.dish);
    // return this.dish;
  }
}

