import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService],
})
export class SendEmailComponent implements OnDestroy {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  // ngOnInit(): void {
  // }
  onSendEmail(): void {
    // Service sendEmail
    // console.log('SendEmail');
    this.authSvc.sendVerificationEmail();
  }
  ngOnDestroy(){
    this.authSvc.logout();
  }

}
