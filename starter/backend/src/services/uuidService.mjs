import {v4 as uuidv4} from 'uuid'

export class UUIDService{

    constructor(){}

    generateUUIDV4(){
        return uuidv4();
    }

}