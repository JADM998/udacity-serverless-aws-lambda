export class EnvironmentService {

    constructor(){}

    auth0domain(){
        return process.env.AUTH0DOMAIN;
    }

    todosTable(){
        return process.env.TODOS_TABLE;
    }

    imageS3Bucket(){
        return process.env.IMAGES_S3_BUCKET;
    }

    urlExpirationTime(){
        return process.env.URL_EXPIRATION_TIME;
    }
}