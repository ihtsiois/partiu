import { IStorageProvider, UploadProps } from '@/providers/IStorageProvider';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, s3AwsRegion, s3BucketName } from '@/plugins/s3';

export class S3StorageProvider implements IStorageProvider {
    async uploadFile({ key, contentType, file }: UploadProps): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: s3BucketName,
            Key: key,
            Body: file,
            ContentType: contentType,
        });

        await s3.send(command);

        return `https://${s3BucketName}.${s3AwsRegion}.s3.amazonaws.com/${key}`;
    }
}
