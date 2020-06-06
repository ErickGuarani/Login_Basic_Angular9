import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  loginForm: FormGroup;
  correctData = true;
  textError = '';


  constructor(private formCreator: FormBuilder ,
              private authSvc: AuthService,
              public auth: AngularFireAuth,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formCreator.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  async onGoogleLogin(){
    // to the service
    try{
      // this.authSvc.loginGoogle();
      const user = await this.authSvc.loginGoogle();
      if (user){
         this.router.navigate(['/home']);
       }else {
         this.router.navigate(['/register']);
      }
    }
    catch (error){console.log(error);
    }
  }
   async onLogin(){
     if (this.loginForm.valid)
    {
       this.correctData = true;

  //      // const { email, password} = this.loginForm.value;
       try{
             const user = await this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
             if (user && user.user.emailVerified){
               // console.log('USER=>', user);
               // redirect to home page
               this.router.navigate(['/home']);
             }else if (user){
               this.router.navigate(['/verification-email']);
             }else {
               this.router.navigate(['/register']);
             }
           }
       catch (error)
           {
             // console.log(error.message);
            this.correctData = false;
            this.textError = error.message;
           }
     }
     else
     {
       this.correctData = false;
       this.textError = 'Please check that the data is correct';
     }
   }



}
