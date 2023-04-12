import AWS from "aws-sdk";
import { HookCallback } from "types";

export const uploadImg = async (blob: Blob | File, callback: HookCallback) => {
  AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "knock-image-post",
      Key: (blob as File).name,
      Body: blob,
    },
  });

  const promise = upload.promise();
  promise.then(
    (res) => {
      callback(res.Location, "alt text");
    },
    (err) => {
      console.error("Error ! :", err);
    }
  );
};
