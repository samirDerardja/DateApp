import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService =inject(AccountService);
  private toast = inject(ToastrService)
  private router =inject(Router);
  @Input() usersFromHomeComponent: any;
  @Output() canceledRegisterMode = new EventEmitter();
  model:any = {}; 

  register() {
this.accountService.register(this.model).subscribe({
  next: response => {
    this.router.navigateByUrl('/members');
    this.toast.success('Votre compte à été crée avec succès!')
    this.cancel();
    
  },
  error: error => this.toast.error(error.error)
  
})
    
  }  

  cancel(){
    console.log('canceled');
    this.canceledRegisterMode.emit(false);
    
  }

  loginRtouter(){
      this.router.navigateByUrl('/login')
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }

}
