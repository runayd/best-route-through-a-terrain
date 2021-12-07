import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPathDiagramComponent } from './find-path-diagram.component';

describe('FindPathDiagramComponent', () => {
  let component: FindPathDiagramComponent;
  let fixture: ComponentFixture<FindPathDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPathDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPathDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
