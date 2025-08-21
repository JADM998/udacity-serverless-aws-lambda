import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import AWSXray from 'aws-xray-sdk-core'

import { EnvironmentService } from '../services/environmentService.mjs'

export class AttachmentUtils {

    constructor(
        environmentService = new EnvironmentService(),
        s3Client = AWSXray.captureAWSv3Client(new S3Client())
    ){
        this.environmentService = environmentService;
        this.s3Client = s3Client;
    }

    async generateUploadUrl(imageId){

        const command = new PutObjectCommand({
            Bucket: this.environmentService.imageS3Bucket(),
            Key: imageId
        });
        const url = await getSignedUrl(this.s3Client, command, {
            expiresIn: this.environmentService.urlExpirationTime()
        })

        return url;
    }

    generateS3Url(imageId){
        return `https://${this.environmentService.imageS3Bucket()}.s3.amazonaws.com/${imageId}`;
    }

}