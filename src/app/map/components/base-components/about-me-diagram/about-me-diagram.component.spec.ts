import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeDiagramComponent } from './about-me-diagram.component';

describe('AboutMeDiagramComponent', () => {
  let component: AboutMeDiagramComponent;
  let fixture: ComponentFixture<AboutMeDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMeDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
