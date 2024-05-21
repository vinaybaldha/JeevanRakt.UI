import { TestBed } from '@angular/core/testing';
import { SignalrService } from './signalr.service';
import { Store, StoreModule } from '@ngrx/store';
import { showAlert } from './_store/donor/donor.actions';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Notification } from './models/Notification';

describe('SignalrService', () => {
  let service: SignalrService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalrService, StoreModule.forRoot()],
    });
    service = TestBed.inject(SignalrService);
    store = TestBed.inject(Store);
  });

  it('should attach addProductListener to the "SendMessage" event', () => {
    spyOn(service, 'showNotification');
    const notification: Notification = {
      message: 'Test message',
      productID: 'test',
      productName: 'test',
    };

    const connection = new HubConnectionBuilder()
      .withUrl('your-signalr-url')
      .build();

    connection.start().then(() => {
      connection.invoke('SendMessage', notification);
      expect(service.showNotification).toHaveBeenCalledWith(notification);
    });
  });

  it('should dispatch showAlert action with the correct payload', () => {
    spyOn(store, 'dispatch');
    const notification: Notification = {
      message: 'Test message',
      productID: 'test',
      productName: 'test',
    };
    service.hubConnection.invoke('SendMessage', notification);
    expect(store.dispatch).toHaveBeenCalledWith(
      showAlert({ message: notification.message, resptype: 'pass' })
    );
  });

  it('should log an error when starting the connection fails', () => {
    spyOn(console, 'log');
    service.hubConnection.start().catch(() => {
      throw new Error('Test error');
    });
    expect(console.log).toHaveBeenCalledWith(
      'Error while starting connection: Test error'
    );
  });

  it('should log a success message when starting the connection succeeds', () => {
    spyOn(console, 'log');
    service.hubConnection.start();
    expect(console.log).toHaveBeenCalledWith('Connection started');
  });
});
