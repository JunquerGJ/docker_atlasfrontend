
import Server from '../models/server';
import Area from '../models/area';
import User from '../models/user';
import Profile from '../models/profile';
import Asset from '../models/asset';
import List from '../models/list';
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
import Evidence from '../models/evidence';
import { IPService } from 'src/app/ips/ips.service';

function getFreshServer(): Server {
  return { id: 0, hostname: "", ip: undefined, assets: [], contacts: [], characteristics: [] }
}

function getFreshContact(): Contact {
  return { id: 0, name: "", tlf: "", email: "" }
}

function getFreshArea(): Area {
  return { id: 0, name: "", description: "" }
}

function getFreshContactTo(): ContactToEntity {
  return { contact: undefined, functionality: "" }
}

function getFreshProfile(): Profile {
  return { id: 0, name: "", permissions: [] }
}

function getFreshUser(): User {
  return { id: 0, name: "", hash: "", profile: undefined }
}

function getFreshAsset(): Asset {
  return { id: 0, name: "", risk: 0, assetType: "", area: undefined, Domain: [], contacts: [], characteristics: [], servers: [] }
}

function getFreshList(): List {
  return { id: 0, name: "", denyList: false, description: "", domains: [] }
}

function getFreshDomain(): Domain {
  return { id: 0, url: "", enviroment: "", privateDomain: false, lists: [], client: "", errorCode: "" }
}

function getFreshCharacteristic(): Characteristic {
  return { name: "" }
}

function getFreshAudit(): Audit {
  return { id: 0, name: "", asset: undefined, auditor: undefined, domain: undefined, tool: "", methodology: "", finished: false, scope: "", auditDate: undefined }
}

function getFreshCertificate(): Certificate {
  return { id: 0, domainName: "", wildcard: false, issuer: "", expirationDate: undefined }
}

function getFreshCWE(): CWE {
  return { id: 0, cweID: "", name: "", description: "" }
}

function getFreshIP(): IP {
  return { id: 0, ip: "", network: undefined }
}

function getFreshNetwork(): Network {
  return { id: 0, name: "", description: "" }
}

function getFreshEvidence(): Evidence {
  return { id: 0, path: "", description: "", vulnerability: undefined, evidenceType: "", content: "" }
}

function getFreshVulnerability(): Vulnerability {
  return { id: 0, name: "", discoveryDate: undefined, description: "", executedTest: "", recommendation: "", risk: "", status: "", audit: undefined, asset: undefined, auditor: undefined, cwe: undefined, ticket: "", source: "", responsable: undefined }
}

function getVulnsRisk(vulnerabilities: Vulnerability[]) {
  var suma = 0;
  var i = 0;
  for (i = 0; i < vulnerabilities.length; i++) {
    switch (vulnerabilities[i].risk) {
      case "CRITICAL":
        suma += 25
        break;
      case "HIGH":
        suma += 5
        break;
      case "MEDIUM":
        suma += 1
        break;
      case "LOW":
        suma += 0.5
        break;
    }

  }
  return suma
}


function validProfile(profile: Profile) {
  let result = ""
  let parameters = []
  if (!profile.name) {
    parameters.push("Name")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}


function validUser(user: User) {
  let result = ""
  let parameters = []
  if (!user.name) {
    parameters.push("Name")
  }
  if (!user.hash) {
    parameters.push("Password")
  }
  if (!user.profile) {
    parameters.push("Profile")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validModifyedUser(user: User) {
  let result = ""
  let parameters = []
  if (user.name.length == 0) {
    parameters.push("Name cannot be empty")
  }
  if (user.hash && user.hash.length == 0) {
    parameters.push("Password cannot be empty")
  }
  if (!user.profile) {
    parameters.push("Profile cannot be empty")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "This update cannot be done: " + parameters[0]
    default:
      return "This update cannot be done: " + parameters.join(", ")
  }
}

function validNetwork(network: Network) {
  let result = "";
  let parameters = []
  if (!network.name) {
    parameters.push("Name")
  }
  if (!network.description) {
    parameters.push("Description")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validArea(area: Area) {
  let result = "";
  let parameters = []
  if (!area.name) {
    parameters.push("Name")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validServer(server: Server) {
  let result = "";
  let parameters = []
  if (!server.hostname) {
    parameters.push("Hostname")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validAsset(asset: Asset) {
  let result = "";
  let parameters = []
  if (!asset.name) {
    parameters.push("Name")
  }
  if (!asset.assetType) {
    parameters.push("Type")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validAudit(audit: Audit) {
  let result = "";
  let parameters = []
  if (!audit.name) {
    parameters.push("Name")
  }
  if (!audit.asset) {
    parameters.push(" Asset")
  }
  if (!audit.methodology) {
    parameters.push(" Methodology")
  }
  if (!audit.auditDate) {
    parameters.push(" Audit Date")
  }
  if (!audit.tool){
    parameters.push(" Tool")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}


function validCertificate(certificate: Certificate) {
  let result = "";
  let parameters = []
  if (!certificate.domainName) {
    parameters.push("Common Name")
  }
  if (!certificate.issuer) {
    parameters.push("Issuer")
  }
  if (!certificate.expirationDate) {
    parameters.push("Expiration Date")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validContact(contact: Contact) {
  let result = "";
  let parameters = []
  if (!contact.name) {
    parameters.push(" Name")
  }
  if (!contact.tlf) {
    parameters.push(" Tlf")
  }
  if (!contact.email) {
    parameters.push(" Email")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}


function validIP(ip: IP) {
  let result = "";
  let parameters = []
  if (!ip.ip) {
    parameters.push(" IP")
  }
  if (!ip.network) {
    parameters.push(" Network")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validList(list: List) {
  let result = "";
  let parameters = []
  if (!list.name) {
    parameters.push(" Name")
  }
  if (!list.description) {
    parameters.push(" Description")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validVulnerability(vulnerability: Vulnerability) {
  let result = "";
  let parameters = []
  if (!vulnerability.name) {
    parameters.push("Name")
  }

  if (!vulnerability.asset) {
    parameters.push("Asset")
  }

  if (!vulnerability.discoveryDate) {
    parameters.push("Discovery date")
  }

  if (!vulnerability.description) {
    parameters.push("Description")
  }

  if (!vulnerability.executedTest) {
    parameters.push("Executed test")
  }

  if (!vulnerability.recommendation) {
    parameters.push("Recommendation")
  }

  if (!vulnerability.risk) {
    parameters.push("Risk")
  }

  if (!vulnerability.status) {
    parameters.push("Status")
  }

  if (!vulnerability.source) {
    parameters.push("Source")
  }

  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}

function validDomain(domain: Domain) {
  let result = "";
  let parameters = []
  if (!domain.url) {
    parameters.push(" FQDN")
  }
  if (!domain.client) {
    parameters.push(" Client")
  }

  if (!domain.enviroment) {
    parameters.push(" Enviroment")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
}


function validContactTo(contactTo : ContactToEntity){
  let result = ""
  let parameters = []
  if(!contactTo.contact){
    parameters.push(" Contact ")
  }
  if(!contactTo.functionality){
    parameters.push(" Role ")
  }
  switch (parameters.length) {
    case 0:
      return result;
    case 1:
      return "Missing parameter: " + parameters[0]
    default:
      return "Missing parameters: " + parameters.join(", ")
  }
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
  getVulnsRisk,
  getFreshList,
  getFreshEvidence,
  validProfile,
  validUser,
  validModifyedUser,
  validArea,
  validAsset,
  validAudit,
  validCertificate,
  validContact,
  validIP,
  validList,
  validDomain,
  validNetwork,
  validServer,
  validVulnerability,
  validContactTo
}