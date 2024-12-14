import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router, Event } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { IStaticMethods } from 'preline';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, HomeComponent, RegisterComponent, NgxSpinnerComponent, PhotoEditorComponent], //on import le commonModule  qui contientle ngFor pour le html
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private accountService = inject(AccountService);
  private router  = inject(Router);

  ngOnInit(): void {
 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
    this.setCurrentUser();
  }

 

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);

  }

}
