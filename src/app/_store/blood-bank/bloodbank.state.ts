import { BloodBank, BloodBankModel } from '../../models/BloodBank';

export const bloodbankState: BloodBankModel = {
  list: [],
  errormessage: '',
  bloodbank: new BloodBank(),
  pages: 1,
  pendingbloodbank: [],
};
