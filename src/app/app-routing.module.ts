import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, emailVerified } from '@angular/fire/auth-guard';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);



const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
     path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
   },
   {
     path: 'verification-email',
     component: SendEmailComponent,
   },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
