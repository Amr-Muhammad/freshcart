import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  loadingScreen: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor() { }



}
