import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionDiagramComponent } from './construction-diagram.component';

describe('ConstructionDiagramComponent', () => {
  let component: ConstructionDiagramComponent;
  let fixture: ComponentFixture<ConstructionDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
