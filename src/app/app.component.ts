import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerceApp';

  isLogged: boolean = false
  constructor(private _authService: AuthenticationService) {}

  ngOnInit(): void {
    
    this._authService.userData.subscribe(() => {
      if (localStorage.getItem('token')) {
        document.querySelector('.bg-white')?.classList.add('py-5', 'px-4')
      }
      else {
        document.querySelector('.bg-white')?.classList.remove('py-5', 'px-4')
      }
    })
  }

}
