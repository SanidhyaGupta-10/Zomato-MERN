import ImageKit from '@imagekit/nodejs';
import { toFile } from '@imagekit/nodejs';

let imagekit: any = null;

function getImageKit() {
  if (!imagekit) {
    imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imagekit;
}

async function uploadFile(buffer: any, fileName: string) {
  const kit = getImageKit();
  return await kit.files.upload({
    file: await toFile(buffer, fileName),
    fileName
  });
}

export { uploadFile };
