import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormsMaterialComponent } from './ngrx-forms-material.component';

describe('NgrxFormsMaterialComponent', () => {
  let component: NgrxFormsMaterialComponent;
  let fixture: ComponentFixture<NgrxFormsMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxFormsMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxFormsMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
