import { inject, Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let accountservice = inject(AccountService);
  const toast = inject(ToastrService);

  if (accountservice.currentUser()) {
    return true;
  } else {
    toast.error(' Vous ne pouvez pas y acceder');
    return false;
  }
};
