import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWasThisMadeComponent } from './how-was-this-made.component';

describe('HowWasThisMadeComponent', () => {
  let component: HowWasThisMadeComponent;
  let fixture: ComponentFixture<HowWasThisMadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowWasThisMadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWasThisMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
