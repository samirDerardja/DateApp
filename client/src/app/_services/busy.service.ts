import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

 busyRequest = 0;
 private spinnerService = inject(NgxSpinnerService);

 busy(){
  this.busyRequest++;
  this.spinnerService.show(undefined, {
    type: 'line-scale-pulse-out',
  })
 }

 idle() {
  this.busyRequest--;
  if(this.busyRequest <= 0) {
    this.busyRequest = 0;
    this.spinnerService.hide();
  }
 }
}
