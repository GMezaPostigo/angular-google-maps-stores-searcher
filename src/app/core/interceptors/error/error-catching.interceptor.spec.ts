import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ErrorCatchingInterceptor } from './error-catching.interceptor';

describe('ErrorCatchingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ErrorCatchingInterceptor],
      imports: [StoreModule.forRoot({})]
    })
  );

  it('should be created', () => {
    const interceptor: ErrorCatchingInterceptor = TestBed.inject(
      ErrorCatchingInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
