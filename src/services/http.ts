import { UploadResponse } from '../types';
import { TEST_URL } from '../constants';

export const uploadPicture = async (formData: FormData): Promise<UploadResponse> => {
  return await fetch(`${TEST_URL}/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }).then((response: Response) => response.json());
};
