import { BloodInventory } from './Blood';
import { Donor } from './donor';
import { Recipient } from './Recipient';

export class BloodBank {
  bloodBankId: string = '';
  bloodBankName: string = '';
  address: string = '';
  donors: Donor[] = [];
  recipients: Recipient[] = [];
  latitude: number = 0;
  longitude: number = 0;
  bloodInventory: BloodInventory = new BloodInventory();
  constructor() {}
}

export interface BloodBankModel {
  list: BloodBank[];
  errormessage: string;
  bloodbank: BloodBank;
}
