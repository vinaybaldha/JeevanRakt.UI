export class Blood {
  bloodGroup: string = '';
  bloodStock: number = 0;
  constructor() {}
}

export class BloodInventory {
  bloodInventoryId: string = '';
  a1: number = 0;
  a2: number = 0;
  b1: number = 0;
  b2: number = 0;
  o1: number = 0;
  o2: number = 0;
  aB1: number = 0;
  aB2: number = 0;
  bloodBankId: string = '';
}

export interface InventoryModel {
  inventory: BloodInventory;
  errormessage: string;
  isLoaded: boolean;
}
