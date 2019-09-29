import { Comment } from "./../shared/comment";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DishService } from "./../services/dish.service";
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { Dish } from "../shared/dish";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { switchMap } from "rxjs/operators";
import {visibility, flyInOut, expand} from '../animations/app.animation';

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;
  visibility = "shown";
  @ViewChild("fform", { static: false }) commentFormDirective;
  formErrors = {
    author: "",
    comment: ""
  };
  validationMessages = {
    author: {
      required: "Author name is required",
      minlength: "Author name must be at least 2 characters long",
      maxlength: "Author name cannot be more than 25 characters long"
    },
    comment: {
      required: "Comment is required",
      minlength: "Comment must be at least 2 characters long",
      maxlength: "Comment cannot be more than 25 characters long"
    }
  };
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishCopy: Dish;
  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject("BaseURL") private BaseURL
  ) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      rating: 5,
      comment: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //(re)set form validation
  }

  ngOnInit() {
    this.dishService
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = "hidden";
          return this.dishService.getDish(params["id"]);
        })
      )
      .subscribe(
        dish => {
          this.visibility = "shown";
          this.dish = dish;
          this.dishCopy = dish;
          this.setPrevNext(dish.id);
        },
        errMess => (this.errMess = <any>errMess)
      );
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.commentForm.reset({
      author: "",
      rating: 5,
      comment: ""
    });
    const formatter = new Intl.DateTimeFormat("en", { month: "short" });
    let date = new Date();
    const month = formatter.format(date);
    const year = date.getFullYear();
    const day = date.getDate();
    this.comment.date = month + " " + day + "," + year;
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy).subscribe(
      dish => {
        this.dish = dish;
        this.dishCopy = dish;
      },
      errMsg => {
        this.dish = null;
        this.dishCopy = null;
        this.errMess = errMsg;
      }
    );
    this.commentFormDirective.reset();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    const prevIdx = (this.dishIds.length + index - 1) % this.dishIds.length;
    const nextIdx = (this.dishIds.length + index + 1) % this.dishIds.length;
    this.prev = this.dishIds[prevIdx];
    this.next = this.dishIds[nextIdx];
  }

  goBack(): void {
    this.location.back();
  }
}
