import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { UploadComponent } from './views/upload/upload.component';
import { AuthGuard } from './guards/auth-guard';
import { SummaryBoxComponent } from './views/summary-box/summary-box.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { ReceivedMessagesComponent } from './received-messages/received-messages.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'upload', component: UploadComponent,canActivate: [AuthGuard]  },
  // { path: '**', redirectTo: '' } ,// Fallback route
  { path: 'summarizer', component: SummaryBoxComponent }, 
  { path: 'sendmessage', component: SendMessageComponent },
  { path: 'received-messages', component: ReceivedMessagesComponent },
  // { path: 'received-messages', component: ReceivedMessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
