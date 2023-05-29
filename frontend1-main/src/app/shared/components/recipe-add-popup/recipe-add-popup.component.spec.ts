import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAddPopupComponent } from './recipe-add-popup.component';

describe('RecipeAddPopupComponent', () => {
  let component: RecipeAddPopupComponent;
  let fixture: ComponentFixture<RecipeAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeAddPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
