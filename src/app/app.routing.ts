import { Routes } from "@angular/router";

import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { LoginComponent } from "./pages/login/login.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "subject",
    pathMatch: "full",
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/default-layout/default-layout.module").then(
            (x) => x.DefaultLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
  {
    path: "login",
    component: LoginComponent,
  },
];
