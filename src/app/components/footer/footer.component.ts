import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor() {

  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0
    })
  }

}

