import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSpeedDiagramComponent } from './change-speed-diagram.component';

describe('ChangeSpeedDiagramComponent', () => {
  let component: ChangeSpeedDiagramComponent;
  let fixture: ComponentFixture<ChangeSpeedDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSpeedDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSpeedDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
