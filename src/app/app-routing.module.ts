import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VulnerabilitiesComponent } from './vulnerabilities/vulnerabilities.component';
import { AssetsComponent } from './assets/assets.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuditsComponent } from './audits/audits.component';
import { AdministrationComponent } from './administration/administration.component';
import { AreasComponent } from './areas/areas.component';
import { UsersComponent } from './administration/users/users.component';
import { ProfilesComponent } from './administration/profiles/profiles.component';
import { NetworksComponent } from './networks/networks.component';
import { IpsComponent } from './ips/ips.component';
import { ServersComponent } from './servers/servers.component';
import { AssetManagementComponent } from './asset-management/asset-management.component'
import { CertificatesComponent } from './certificates/certificates.component';
import { DomainsComponent } from './domains/domains.component';
import { DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'vulnerabilities', component: VulnerabilitiesComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'audits', component: AuditsComponent },
  {
    path: 'inventory', component: AssetManagementComponent,
    children: [
      { path: '', redirectTo: 'vulnerabilities', pathMatch: "full" },
      { path: 'vulnerabilities', component: VulnerabilitiesComponent },
      { path: 'areas', component: AreasComponent },
      { path: 'servers', component: ServersComponent },
      { path: 'assets', component: AssetsComponent },
      { path: 'ips', component: IpsComponent },
      { path: 'networks', component: NetworksComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'audits', component: AuditsComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'domains', component: DomainsComponent },
    ]
  },
  {
    path: 'administration', component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: "full" },
      { path: 'users', component: UsersComponent },
      { path: 'profiles', component: ProfilesComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
