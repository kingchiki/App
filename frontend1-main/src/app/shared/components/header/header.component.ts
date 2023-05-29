import {Component} from '@angular/core';
import {AuthResponse} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userData: AuthResponse = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : null

  constructor(private router: Router) {
  }

  handleLogout() {
    localStorage.removeItem("userData");
    this.router.navigate(["/home"])
  }

  onSearch(e: any) {
    if (e.target.value)
      this.router.navigate(['/search', e.target.value]);
  }
}
