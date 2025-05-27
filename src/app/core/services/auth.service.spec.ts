import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start as logged out', () => {
    expect(service.isUserLogged()).toBeFalse();
  });

  it('should return true after login', () => {
    // service.loginUser();
    expect(service.isUserLogged()).toBeTrue();
  });

  it('should return false after logout', () => {
    // service.loginUser();
    service.logout();
    expect(service.isUserLogged()).toBeFalse();
  });
});
