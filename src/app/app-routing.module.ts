import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login" , component:LoginComponent},
  {path:"notes", component:NotesComponent,canActivate:[RouteGuard]},
  {path:"home",component:HomeComponent},
  {path:"passwordreset",component:PasswordresetComponent},
  {path:"",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
