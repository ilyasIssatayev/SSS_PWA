import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SlideFullpageComponent } from './components/slide-fullpage/slide-fullpage.component'
import { RegisterPageComponent} from './components/register-page/register-page.component';
const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'main', component: SlideFullpageComponent },
  { path: 'register', component: RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
