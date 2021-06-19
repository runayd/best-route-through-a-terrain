import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSlateComponent } from './menu-slate.component';

describe('MenuSlateComponent', () => {
  let component: MenuSlateComponent;
  let fixture: ComponentFixture<MenuSlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
