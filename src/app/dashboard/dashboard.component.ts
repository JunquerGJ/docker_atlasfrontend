import { Component, OnInit } from '@angular/core';
import { AssetService } from '../assets/assets.service';
import { AuditService } from '../audits/audits.service';
import { VulnerabilityService } from '../vulnerabilities/vulnerabilities.service';
import { ServerService } from '../servers/servers.service';
import { IPService } from '../ips/ips.service';
import { NetworkService } from '../networks/networks.service';
import { CertificateService } from '../certificates/certificates.service';
import { DomainService } from '../domains/domains.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public nAssets : number;
  public nAudits : number;
  public nVulnerabilities : number;
  public nServers : number;
  public nIPS : number;
  public nNetworks : number;
  public nCertificates : number;
  public nDomains : number;

  constructor(
    private assetService : AssetService,
    private auditService : AuditService,
    private vulnerabilityService : VulnerabilityService,
    private serverService : ServerService,
    private ipService : IPService,
    private networkService : NetworkService,
    private certificateService : CertificateService,
    private domainService : DomainService,
  ) { }

  ngOnInit(): void {
    
    this.assetService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nAssets = elements.length
      }
    );

    this.auditService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nAudits = elements.length
      }
    );

    this.vulnerabilityService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nVulnerabilities = elements.length
      }
    );

    this.serverService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nServers = elements.length
      }
    );

    this.ipService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nIPS = elements.length
      }
    );

    this.networkService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nNetworks = elements.length
      }
    );

    this.certificateService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nCertificates = elements.length
      }
    );

    this.domainService.getSome([],{id : true})
    .subscribe(
      (elements) => {
        this.nDomains = elements.length
      }
    );


  }

}
