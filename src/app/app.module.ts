import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { vi_VN } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import vi from "@angular/common/locales/vi";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SubjectComponent } from "./pages/subject/subject.component";
import { DetailSubjectComponent } from "./pages/detail-subject/detail-subject.component";
import { SubjectManagerComponent } from "./pages/subject-manager/subject-manager.component";
import { MaterialModule } from "./material.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "components/spt-modal/modal.component";
import { PopoverComponent } from "components/stp-popover/popover.component";
import { TableComponent } from "components/stp-table/table.component";
import { TimeFilterComponent } from "components/stp-time-filter/time-filter.component";
import { ToastsContainer } from "components/stp-toast/toast-container.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { MatInputModule } from "@angular/material/input";
import { UploadImageComponent } from "components/stp-upload-image/upload-image.component";
import { UserManagerComponent } from "./pages/user-manager/user-manager.component";
import { PersonalInformationComponent } from "./pages/personal-information/personal-information.component";

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginComponent,
    SubjectComponent,
    DetailSubjectComponent,
    SubjectManagerComponent,
    ModalComponent,
    PopoverComponent,
    TableComponent,
    TimeFilterComponent,
    ToastsContainer,
    UploadImageComponent,
    UserManagerComponent,
    PersonalInformationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ModalModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
