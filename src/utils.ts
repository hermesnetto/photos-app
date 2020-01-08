import { Picture } from './types';

export const getPictureFormData = (picture: Picture): FormData => {
  const formData = new FormData();

  let uri = picture.uri;
  let filename = uri.split('/').pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Assume "photo" is the name of the form field the server expects
  formData.append('photo', { uri, name: filename, type });

  return formData;
};
