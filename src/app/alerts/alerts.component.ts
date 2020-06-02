import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})


export class AlertsComponent implements OnInit {



  public subscription: Subscription;
  public message: any;
  public type: string;
  public show: boolean = false


  constructor(private alertService: AlertsService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = "alert alert-success"
            this.type = message.type
            break;
          case 'error':
            message.cssClass = "alert alert-danger"
            this.type = "danger"
            break;
        }
        this.message = message
        //para que la alerta desaparezca sola
        setTimeout(() => {
          this.message = null;
        }, 5000);
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}