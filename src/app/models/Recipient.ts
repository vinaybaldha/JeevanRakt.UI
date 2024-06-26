export class Recipient {
  recipientId: string = '';
  recipientName: string = '';
  recipientBloodType: string = '';
  recipientContactNumber: string = '';
  recipientGender: string = '';
  recipientAge: number = 0;
  recipientAddress: string = '';
  bloodBankId: string = '';
  paymentStatus: string = '';

  constructor() {}
}

export interface RecipientModel {
  list: Recipient[];
  pendinglist: Recipient[];
  errormessage: string;
}
