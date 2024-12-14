import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastrService)
    model: any = {};
title: any;

  loginRouter() {
    this.router.navigateByUrl('/login')
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }

  
  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.toast.success('Vous etes connecté !')
        this.router.navigateByUrl('/members')
      },
      error: error => this.toast.error(error.error)
      
    })
  }
 
}
