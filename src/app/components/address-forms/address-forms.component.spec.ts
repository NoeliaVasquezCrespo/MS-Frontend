import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormsComponent } from './address-forms.component';

describe('AddressFormsComponent', () => {
  let component: AddressFormsComponent;
  let fixture: ComponentFixture<AddressFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
