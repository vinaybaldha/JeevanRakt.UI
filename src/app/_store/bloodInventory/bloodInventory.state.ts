import { BloodInventory, InventoryModel } from '../../models/Blood';

export const inventoryState: InventoryModel = {
  inventory: new BloodInventory(),
  errormessage: '',
  isLoaded: false,
};
