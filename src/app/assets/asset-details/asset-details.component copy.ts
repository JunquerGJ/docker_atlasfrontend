import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetService } from '../assets.service';
import { AlertsService } from '../../../app/alerts.service';
import { HttpParams } from '@angular/common/http';
import Asset from '../../shared/models/asset';
@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  @Input() input : Asset;
  asset : Asset;
  @Output() updated = new EventEmitter<Asset>()
  constructor(private assetService : AssetService,private alertService: AlertsService) { }

  ngOnInit(): void {
    this.asset = this.input
    this.asset.servers = []
    this.asset.characteristics = []
    this.asset.contacts = []
    this.getAssetDetails(this.input)
  }

  getAssetDetails = (asset : Asset) => {
    const aux = {
      servers : {
        select : {
          hostname : true,
          ip : true
        }
      },
      characteristics : true,
      contacts : {
        select : {
          functionality : true,
          contact : true
        }
      },
      Vulnerability : true,
      Domain : true
    }
    const params = new HttpParams()
      .set('params',JSON.stringify(aux))


      this.assetService.get(asset.id,params)
        .subscribe((asset) => {
          this.asset = asset
        },
        error => {
          this.alertService.error(error.error.message)
        })
  }

}
