import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { MemberListComponent } from 'src/app/members/member-list/member-list.component';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { ListsComponent } from 'src/app/lists/lists.component';
import { AuthGuard } from '../app/_guards/auth.guard';
import { MemberDetailComponent } from '../app/members/member-detail/member-detail.component';
import { MemberDetailResolver } from '../app/_resolver/member-detail.resolver';
import { MemberListResolver } from '../app/_resolver/member-list.resolver';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'members/:id', component: MemberDetailComponent,
    resolve: { user: MemberDetailResolver } },
  { path: 'members', component: MemberListComponent, canActivate: [AuthGuard],
  resolve: { users: MemberListResolver }  },
  { path: 'messages', component: MessagesComponent },
  { path: 'lists', component: ListsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
