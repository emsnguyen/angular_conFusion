import { Leader } from "./../shared/leader";
import { LeaderService } from "./../services/leader.service";
import { PromotionService } from "./../services/promotion.service";
import { DishService } from "./../services/dish.service";
import { Promotion } from "./../shared/promotion";
import { Dish } from "./../shared/dish";
import { Component, OnInit, Inject } from "@angular/core";
import { flyInOut, expand } from "../animations/app.animation";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display:block;"
  },
  animations: [flyInOut(), expand()]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promotionErrMsg: string;
  leaderErrMsg: string;
  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject("BaseURL") public BaseURL
  ) {}

  ngOnInit() {
    this.dishService
      .getFeaturedDish()
      .subscribe(
        dish => (this.dish = dish),
        errMsg => (this.dishErrMsg = errMsg)
      );
    this.promotionService
      .getFeaturedPromotion()
      .subscribe(
        promotion => (this.promotion = promotion),
        errMsg => (this.promotionErrMsg = errMsg)
      );
    this.leaderService
      .getFeaturedLeader()
      .subscribe(
        leader => (this.leader = leader),
        errMsg => (this.leaderErrMsg = errMsg)
      );
  }
}
