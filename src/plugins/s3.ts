import { S3Client } from '@aws-sdk/client-s3';
import * as process from 'node:process';

export const s3AwsRegion = process.env.AWS_REGION!;
export const s3BucketName = process.env.AWS_S3_BUCKET!;

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});
