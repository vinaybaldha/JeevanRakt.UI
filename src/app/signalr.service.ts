import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Notification } from './models/Notification';
import { Store } from '@ngrx/store';
import { addNotification } from './_store/Globel/globel.actions';
import { AccountService } from './services/account.service';
import { userinfo } from './models/Employee';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public hubConnection!: signalR.HubConnection;
  userInfo: userinfo | undefined;
  roles: string | null = '';

  constructor(private store: Store, private authService: AccountService) {}
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7016/Notify', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.addUserToGroup();
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  private addUserToGroup() {
    this.userInfo = this.authService.getUserDataFromStorage();
    // this.authService.isAdmin.subscribe((res) => {
    //   this.roles = res ? 'Admin' : 'User';
    // });
    this.roles = localStorage.getItem('roles');
    console.log(`Adding user to role group: ${this.roles}`);
    this.hubConnection
      .invoke('AddToRoleGroup', this.roles)
      .catch((err) => console.error('Error while adding to group: ' + err));
  }

  public addProductListener = () => {
    this.hubConnection.on('SendMessage', (notification: Notification) => {
      this.showNotification(notification);
    });
  };

  showNotification(notification: Notification) {
    // this.toastr.warning( notification.message,notification.productID+" "+notification.productName);
    // console.log(notification);
    // this.store.dispatch(
    //   showAlert({ message: notification.message, resptype: 'pass' })
    // );
    this.store.dispatch(addNotification({ notification: notification }));
  }
}
