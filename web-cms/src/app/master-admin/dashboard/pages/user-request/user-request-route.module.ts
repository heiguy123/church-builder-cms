import { Routes } from "@angular/router";
import { SingleUserRequestComponent } from "../single-user-request/single-user-request.component";
import { UserRequestComponent } from "./user-request.component";


export const ROUTES: Routes = [
  { path: '', component: UserRequestComponent },
  { path: ':id', component: SingleUserRequestComponent },
];