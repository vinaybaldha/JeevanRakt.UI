export class Donor {
  donorId: string = '';
  donorName: string = '';
  donorBloodType: string = '';
  donorContactNumber: string = '';
  donorGender: string = '';
  donorAge: number = 0;
  donorAddress: string = '';
  bloodBankId: string = '';

  constructor() {}
}

export interface DonorModel {
  list: Donor[];
  errormessage: string;
  isLoaded: boolean;
}
