import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription;
  public       message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  	this.subscription = this.alertService.getMessage().subscribe(message => {
  		this.message = message;
  	})
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

}
