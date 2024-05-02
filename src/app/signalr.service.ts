import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Notification } from './models/Notification';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor() {

  }
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7016/Notify',{ skipNegotiation: true,
                              transport: signalR.HttpTransportType.WebSockets})
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addProductListener = () => {
      this.hubConnection.on('SendMessage', (notification: Notification) => {
        this.showNotification(notification);
      });
    }

    showNotification(notification: Notification) {
      // this.toastr.warning( notification.message,notification.productID+" "+notification.productName);
      console.log(notification);
    }
  }