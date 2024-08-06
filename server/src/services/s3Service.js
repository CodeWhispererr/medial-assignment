import aws from 'aws-sdk';

const s3 = new aws.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const uploadToS3 = async (buffer, fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: 'image/png'
  };

  return s3.upload(params).promise();
};