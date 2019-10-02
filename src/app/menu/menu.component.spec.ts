import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, of } from 'rxjs';
import { baseURL } from './../shared/baseurl';
import { DISHES } from './../shared/dishes';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
// import {Dish, DishService, DISHES, baseURL, Observable, of, MatGridListModule, MatProgressSpinnerModule}
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const dishServiceStub = {
      getDishes: function():  Observable<Dish[]>{
        return of(DISHES);
      }
    }
    TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'menu', component:MenuComponent}]),
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      declarations: [ MenuComponent ],
      providers:[
        {provide:DishService, useValue:dishServiceStub},
        {provide:'BaseURL', useValue:baseURL}
      ]
    })
    .compileComponents();

    const dishservice = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes items should be 4', ()=> {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipadoka');
    expect(component.dishes[3].featured).toBeFalsy();
  });

  it('should use dishes in the template', () => {
    fixture.detectChanges();
    let de:DebugElement;
    let el:HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());
  });
});

