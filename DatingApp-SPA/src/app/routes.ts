import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { MemberListComponent } from 'src/app/members/member-list/member-list.component';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { ListsComponent } from 'src/app/lists/lists.component';
import { AuthGuard } from '../app/_guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent },
  { path: 'lists', component: ListsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
