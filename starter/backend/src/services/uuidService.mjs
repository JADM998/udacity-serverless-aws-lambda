import {v4 as uuidv4, validate, version} from 'uuid'

export class UUIDService{

    constructor(){}

    generateUUIDV4(){
        return uuidv4();
    }

    isUUIDv4(string) {
        return validate(string) && version(string) === 4;
    }
}