import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  userDataFlag: boolean = false
  constructor(private _authservice: AuthenticationService) { }

  ngOnInit(): void {
    this._authservice.userData.subscribe(() => {
      if (localStorage.getItem('token')) {
        this.userDataFlag = true
      }
      else {
        this.userDataFlag = false
      }
    })
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0
    })
  }

}

