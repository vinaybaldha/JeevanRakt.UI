import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from './services/token.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { DonorReducer } from './_store/donor/donor.reducer';
import { DonorEffects } from './_store/donor/donor.effects';
import { RecipientReducer } from './_store/recipient/recipient.reducer';
import { RecipientEffects } from './_store/recipient/recipient.effects';
import { BloodBankReducer } from './_store/blood-bank/bloodbank.reducer';
import { BloodBankEffects } from './_store/blood-bank/bloodbank.effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UserReducer } from './_store/user/user.reducer';
import { UserEffects } from './_store/user/user.effects';
import { BloodInventoryEffects } from './_store/bloodInventory/bloodInventory.effects';
import { BloodInventoryReducer } from './_store/bloodInventory/bloodInventory.reducer';
import { GlobelReducer } from './_store/Globel/globel.reducer';
import { GlobelEffects } from './_store/Globel/globel.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    provideStore({
      donor: DonorReducer,
      recipient: RecipientReducer,
      bloodbank: BloodBankReducer,
      user: UserReducer,
      inventory: BloodInventoryReducer,
      globel: GlobelReducer,
    }),
    provideEffects([
      DonorEffects,
      RecipientEffects,
      BloodBankEffects,
      UserEffects,
      BloodInventoryEffects,
      GlobelEffects,
    ]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
