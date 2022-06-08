import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { SubjectComponent } from 'app/pages/subject/subject.component';
import { DetailSubjectComponent } from 'app/pages/detail-subject/detail-subject.component';

export const DefaultLayoutRoutes: Routes = [
    { path: 'subject', component: SubjectComponent   },
    { path: 'subject',       children:[
        {
            path:'detail',
            component: DetailSubjectComponent
        },
        {
            path:'exam'
        }
    ]},
    { path: 'personal-infomation',      component: SubjectComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
