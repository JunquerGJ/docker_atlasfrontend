
import Server from '../models/server';
import Area from '../models/area';
import User from '../models/user';
import Profile from '../models/profile';
import Asset from '../models/asset';
import ContactToEntity from '../models/contacttoentity';
import Domain from '../models/domain';
import Audit from '../models/audit';
import Certificate from '../models/certificate';
import Characteristic from '../models/characteristic';
import Contact from '../models/contact';
import CWE from '../models/cwe';
import IP from '../models/ip';
import Network from '../models/network';
import Vulnerability from '../models/vulnerability';

function getFreshServer() : Server {
    return { id: 0, hostname: "", ip: null, assets: [], contacts : [], characteristics: [] }
}

function getFreshContact() : Contact {
    return { id : 0, name : "", tlf : "", email : ""}
}

function getFreshArea(): Area {
    return { id : 0, name : "", description : ""}
}

function getFreshContactTo(): ContactToEntity {
    return { contact : null, functionality : "" }
}

 function getFreshProfile(): Profile {
    return { id : 0, name : "", permissions : []}
}

function   getFreshUser(): User {
    return { id : 0,name : "", hash : "" , profile : null }
  }

  function getFreshAsset() : Asset {
      return { id : 0 , name : "", risk : 0, assetType : "",area : null, Domain : [],contacts : [], characteristics : [], servers : []}
  }

  function getFreshDomain() : Domain {
      return { id : 0, url : "", enviroment : "", privateDomain : false,  waf : false}
  }

  function getFreshCharacteristic() : Characteristic {
    return { name : ""}
  }

  function getFreshAudit() : Audit {
    return { id : 0, name : "", asset : null, auditor : null, domain : null, tool : "", methodology : "", finished : false,scope : "", auditDate : null}
  }

  function getFreshCertificate() : Certificate {
      return { id : 0, domainName : "", wildcard : false, issuer : "", expirationDate : null}
  }

  function getFreshCWE() : CWE {
      return { id : 0, cweID : "", name : "", description : ""}
  }

  function getFreshIP() : IP {
      return { id : 0, ip : "", network : null}
  }

  function getFreshNetwork() : Network {
      return { id : 0, name : "", description : ""}
  }

  function getFreshVulnerability() : Vulnerability {
      return { id : 0, name : "" ,discoveryDate : null,description : "", executedTest : "", recommendation : "", risk : "", status : "", audit : null, asset : null,auditor : null, cwe : null,ticket : "", source : "", responsable : null}
  }

  function getVulnsRisk(vulnerabilities : Vulnerability[]){
    var suma = 0;
    var i = 0;
    for(i=0;i<vulnerabilities.length;i++){
        switch(vulnerabilities[i].risk){
            case "CRITICAL":
                suma+=25
                break;
                case "HIGH":
                    suma+=5
                    break;
                    case "MEDIUM":
                        suma+=1
                        break;
                        case "LOW":
                            suma+=0.5
                            break;
        }
      
    }
    return suma
  }


  export {
      getFreshArea,
      getFreshServer,
      getFreshProfile,
      getFreshUser,
      getFreshAsset,
      getFreshContactTo,
      getFreshDomain,
      getFreshAudit,
      getFreshCertificate,
      getFreshCharacteristic,
      getFreshContact,
      getFreshCWE,
      getFreshIP,
      getFreshNetwork,
      getFreshVulnerability,
      getVulnsRisk
  }