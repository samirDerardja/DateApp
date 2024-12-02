import { CanDeactivateFn } from '@angular/router';
import { Member } from '../_appModels/member';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {

  if(component.editForm?.dirty) 
  {
    return confirm('Ets vous sûr de vouloir continuer? toutes modification ne sera pas sauvegarder!')
  }

  return true;
};
