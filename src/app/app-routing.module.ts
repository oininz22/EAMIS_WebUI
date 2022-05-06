import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  // //{ path: '**', redirectTo: '/not-found' },
  { path: 'Login', component : LoginComponent},
  { path: 'admin', 
    loadChildren: () => 
      import('./modules/eamis/eamis.module').then((m) => m.EamisModule),
  },
  { path: '', redirectTo:'/Login', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
  
  //{ path: 'not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
