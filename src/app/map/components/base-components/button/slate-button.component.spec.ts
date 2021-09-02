import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlateButtonComponent } from './slate-button.component';

describe('ButtonComponent', () => {
  let component: SlateButtonComponent;
  let fixture: ComponentFixture<SlateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
