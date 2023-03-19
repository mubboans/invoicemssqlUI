import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'common',loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule)

  // },
  {
    path:'',pathMatch:'full',redirectTo:'about'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
