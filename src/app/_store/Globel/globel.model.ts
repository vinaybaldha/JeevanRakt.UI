import { Notification } from '../../models/Notification';

export interface GlobelModel {
  isLoaded: boolean;
  url: string;
  notificationlist: Notification[];
}
