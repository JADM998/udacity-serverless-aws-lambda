import axios from 'axios';
import { EnvironmentService } from './environmentService.mjs';

export class Auth0Service {

    constructor(
        environmentService = new EnvironmentService()
    ){
        this.environmentService = environmentService;
    }

    async getCertificate(kid){
        if(!kid) throw Error("No KeyId was added to obtain the certificate");

        const auth0Domain = this.environmentService.auth0domain();
        if(!auth0Domain) throw new Error("No auth0 domain to reach");

        const url = `https://${auth0Domain}/.well-known/jwks.json`;
        const response = await axios.get(url);

        if(response.status !== 200) throw new Error(`Auth0 request responded with status: ${response.status} and body: ${JSON.stringify(response.data)}`);

        const keys = response.data.keys;
        const keyObject = keys.find(key => key.kid === kid);
        if(!keyObject) throw new Error(`Auth0 reply didn't contain kid ${kid}`)
        
        const certificate = `-----BEGIN CERTIFICATE-----\n${keyObject.x5c[0]}\n-----END CERTIFICATE-----`;

        return certificate;
    }
}