import { IStorageProvider, UploadProps } from '@/providers/IStorageProvider';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, s3AwsRegion, s3BucketName } from '@/plugins/s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3StorageProvider implements IStorageProvider {
    async getObjectUrl(resource: string, signed: boolean): Promise<string> {
        if (signed) {
            // Create Get Object Command
            const command = new GetObjectCommand({
                Bucket: s3BucketName,
                Key: resource,
            });

            // Generate Signed URL
            return await getSignedUrl(s3, command, { expiresIn: 600 });
        }

        return `http://${s3BucketName}.s3.${s3AwsRegion}.amazonaws.com/${resource}`;
    }

    async getUploadSignedUrl(props: UploadProps): Promise<{ upload_url: string; asset_url: string }> {
        // Create Put Object Command
        const command = new PutObjectCommand({
            Bucket: s3BucketName,
            Key: props.key,
            ContentLength: props.contentLength,
            ContentType: props.contentType,
        });

        // Generate Signed URL
        const upload_url = await getSignedUrl(s3, command, { expiresIn: props.expiresIn });
        const asset_url = `http://${s3BucketName}.s3.${s3AwsRegion}.amazonaws.com/${props.key}`;
        return { upload_url, asset_url };
    }
}
