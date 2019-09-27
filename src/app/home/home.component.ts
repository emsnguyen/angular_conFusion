import { Leader } from './../shared/leader';
import { LeaderService } from './../services/leader.service';
import { DISHES } from './../shared/dishes';
import { PROMOTIONS } from './../shared/promotions';
import { PromotionService } from './../services/promotion.service';
import { DishService } from './../services/dish.service';
import { Promotion } from './../shared/promotion';
import { Dish } from './../shared/dish';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader:Leader;
  constructor(private dishService:DishService, 
    private promotionService:PromotionService,
    private leaderService:LeaderService
    ) { }

  ngOnInit() {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedLeader();
  }

}
