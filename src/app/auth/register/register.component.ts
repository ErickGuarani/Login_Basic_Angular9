import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  // Instancia para form en html
  // registerForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  registerForm: FormGroup;
  correctData = true;
  textError = '';

  constructor(private formCreator: FormBuilder, private authSvc: AuthService, private router: Router, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.registerForm = this.formCreator.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  async onRegister(){
    // const {email, password} = this.registerForm.value;
    if (this.registerForm.valid)
    {
       this.correctData = true;

  //      // const { email, password} = this.loginForm.value;
       try {
            const user = await this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password);
            if (user){
            // redirect to
            this.router.navigate(['/verification-email']);
            }
          }
      catch (error)
          {
            console.log(error.message);
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
