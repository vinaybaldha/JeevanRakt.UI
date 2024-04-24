export class BloodBank {
  bloodBankId: string = '';
  bloodBankName: string = '';
  address: string = '';
  latitude: number = 0;
  longitude: number = 0;
  constructor() {}
}

export interface BloodBankModel{
  list:BloodBank[]
  errormessage:string
}