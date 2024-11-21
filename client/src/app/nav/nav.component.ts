import { Component, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  accountService = inject(AccountService);
  private router = inject(Router);
  
    model: any = {};
    toast: any = {};
    title: any;


  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
      },
      error: error => console.log('erreur')
      
      
    })
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
