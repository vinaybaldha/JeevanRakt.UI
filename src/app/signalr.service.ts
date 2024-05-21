import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Notification } from './models/Notification';
import { Store } from '@ngrx/store';
import { showAlert } from './_store/donor/donor.actions';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public hubConnection!: signalR.HubConnection;

  constructor(private store: Store) {}
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7016/Notify', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addProductListener = () => {
    this.hubConnection.on('SendMessage', (notification: Notification) => {
      this.showNotification(notification);
    });
  };

  showNotification(notification: Notification) {
    // this.toastr.warning( notification.message,notification.productID+" "+notification.productName);
    console.log(notification);
    this.store.dispatch(
      showAlert({ message: notification.message, resptype: 'pass' })
    );
  }

  // addNotification(message:string){
  //   return this._http.get(`https://localhost:7016/api/Message?message=${message}`)
  // }
}
