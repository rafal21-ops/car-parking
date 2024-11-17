import { TestBed } from '@angular/core/testing';
import { TestingComponent } from './testing.component';
import { RouterModule } from '@angular/router';

describe('TestingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TestingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.ant-card-head-title')?.textContent).toContain(
      'Lista dostępnych miejsc'
    );
  });
});
