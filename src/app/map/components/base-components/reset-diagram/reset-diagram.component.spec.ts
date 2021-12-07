import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDiagramComponent } from './reset-diagram.component';

describe('ResetDiagramComponent', () => {
  let component: ResetDiagramComponent;
  let fixture: ComponentFixture<ResetDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
