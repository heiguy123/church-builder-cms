import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,  
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const cookieExists: boolean = this.cookieService.check('role');
    const cookieValue: string = this.cookieService.get('role');
    if (cookieExists && cookieValue === 'admin') {
      return true;
    } else {
      this.toastr.error("You are not authorized to access the page", 'Error', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
      if (cookieExists) {
        this.cookieService.deleteAll();
      }
      return this.router.parseUrl('/login');
    }
  }
}
