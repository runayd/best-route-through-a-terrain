import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionDiagramComponent } from './instruction-diagram.component';

describe('InstructionDiagramComponent', () => {
  let component: InstructionDiagramComponent;
  let fixture: ComponentFixture<InstructionDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
