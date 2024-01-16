import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = true

  constructor(private _authser: AuthenticationService, private _router: Router) {

  }

  ngOnInit(): void {
    this._authser.userData.subscribe(() => {

      if (localStorage.getItem('token') != null) {
        this.isLogged = true
        // _router.navigate(['./home'])
      }

      else {
        this.isLogged = false
        // this._router.navigate(['./login']) //! el line da 3bqryyyyyyy momken y5leny ast8na 3n el gaurd
      }

    })
  }

  logout() {
    this._authser.logout()
  }
}



