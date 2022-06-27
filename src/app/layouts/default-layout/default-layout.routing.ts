import { Routes } from "@angular/router";

import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { SubjectComponent } from "app/pages/subject/subject.component";
import { DetailSubjectComponent } from "app/pages/detail-subject/detail-subject.component";
import { SubjectManagerComponent } from "app/pages/subject-manager/subject-manager.component";
import { UserManagerComponent } from "app/pages/user-manager/user-manager.component";

export const DefaultLayoutRoutes: Routes = [
  { path: "subject", component: SubjectComponent },
  {
    path: "subject",
    children: [
      {
        path: "detail",
        component: DetailSubjectComponent,
      },
      {
        path: "exam",
      },
    ],
  },
  { path: "subject-manager", component: SubjectManagerComponent },
  { path: "personal-infomation", component: SubjectComponent },
  { path: "user-manager", component: UserManagerComponent },
  { path: "table", component: TableComponent },
  { path: "typography", component: TypographyComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
];
