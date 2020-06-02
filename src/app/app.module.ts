import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VulnerabilitiesComponent } from './vulnerabilities/vulnerabilities.component';
import { VulnerabilityService } from './vulnerabilities/vulnerabilities.service';
import {AssetsComponent} from './assets/assets.component';
import { AuditsComponent } from './audits/audits.component';
import {AreasComponent} from './areas/areas.component';
import {AdministrationComponent} from './administration/administration.component';
import { UsersComponent } from './administration/users/users.component';
import {ProfilesComponent} from './administration/profiles/profiles.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { ContactsComponent } from './contacts/contacts.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ProfileDetailsComponent } from './administration/profiles/profile-details/profile-details.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { DomainsComponent } from './domains/domains.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { NetworksComponent } from './networks/networks.component';
import { IpsComponent } from './ips/ips.component';
import { ServersComponent } from './servers/servers.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';
import { ServerDetailsComponent } from './servers/server-details/server-details.component';
import { AssetDetailsComponent } from './assets/asset-details/asset-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDomainComponent } from './domains/add-domain/add-domain.component';
import { AddCertificateComponent } from './certificates/add-certificate/add-certificate.component';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';
import { AddAuditComponent } from './audits/add-audit/add-audit.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { AddIpComponent } from './ips/add-ip/add-ip.component';
import { AddNetworkComponent } from './networks/add-network/add-network.component';
import { AddServerComponent } from './servers/add-server/add-server.component';
import { AddVulnerabilityComponent } from './vulnerabilities/add-vulnerability/add-vulnerability.component';
import { AddAreaComponent } from './areas/add-area/add-area.component';
import { VulnerabilityDetailsComponent } from './vulnerabilities/vulnerability-details/vulnerability-details.component';
import { AuditDetailsComponent } from './audits/audit-details/audit-details.component';
/*
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompaniesComponent} from './administration/companies/companies.component';
import {GroupsComponent} from './administration/groups/groups.component';
import {DepartmentsComponent} from './administration/departments/departments.component';
import {CompanyDetailsComponent} from './administration/companies/company-details/company-details.component';
import {AreaDetailsComponent} from './administration/areas/area-details/area-details.component';
import {CompanyService} from './administration/companies/company.service';
import { AlertsComponent } from './alerts/alerts.component';
import { UserDetailsComponent } from './administration/users/user-details/user-details.component';
import { ProfileDetailsComponent } from './administration/profiles/profile-details/profile-details.component';
import { MethodologiesComponent } from './methodologies/methodologies.component';
import { VulnerabilityDetailsComponent } from './vulnerabilities/vulnerability-details/vulnerability-details.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { SisifoComponent } from './sisifo/sisifo.component';
import { TestsComponent } from './tests/tests.component';
import { CredentialsComponent } from './administration/credentials/credentials.component';
import { BarGraficComponent } from './bar-grafic/bar-grafic.component';
import { MethodologyDetailComponent } from './methodologies/methodology-detail/methodology-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VulnerabilitiesComponent,
    AssetsComponent,
    AuditsComponent,
    AreasComponent,
    AdministrationComponent,
    UsersComponent,
    ProfilesComponent,
    ContactsComponent,
    AlertsComponent,
    ProfileDetailsComponent,
    CertificatesComponent,
    DomainsComponent,
    CharacteristicsComponent,
    NetworksComponent,
    IpsComponent,
    ServersComponent,
    AssetManagementComponent,
    ServerDetailsComponent,
    AssetDetailsComponent,
    DashboardComponent,
    AddDomainComponent,
    AddCertificateComponent,
    AddAssetComponent,
    AddAuditComponent,
    AddContactComponent,
    AddIpComponent,
    AddNetworkComponent,
    AddServerComponent,
    AddVulnerabilityComponent,
    AddAreaComponent,
    VulnerabilityDetailsComponent,
    AuditDetailsComponent,
    /*
    DashboardComponent,
    CompaniesComponent,
    GroupsComponent,
    DepartmentsComponent,
    CompanyDetailsComponent,
    AreaDetailsComponent,
    AlertsComponent,
    UserDetailsComponent,
    ProfileDetailsComponent,
    MethodologiesComponent,
    ProfileDetailsComponent,
    PieChartComponent,
    MethodologiesComponent,
    VulnerabilityDetailsComponent,
    TestsComponent,
    CredentialsComponent,
    KnowledgeComponent,
    SisifoComponent,
    AuditsComponent,
    BarGraficComponent,
    MethodologyDetailComponent,
    NotFoundComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
//    ChartsModule
  ],
  providers: [VulnerabilityService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
