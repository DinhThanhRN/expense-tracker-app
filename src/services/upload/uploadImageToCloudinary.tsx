import axios from 'axios';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from '../../utils/backend_url';

export const uploadImageToCloudinary = async (
  image: any,
  saveAs: string = '',
) => {
  const response = await axios.post(
    `${CLOUDINARY_URL.replace('<CLOUD_NAME>', CLOUDINARY_NAME)}`,
    {
      file: image,
      api_key: CLOUDINARY_API_KEY,
      timestamp: new Date().getTime(),
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
      public_id: saveAs,
    },
  );
  return response.data;
};
