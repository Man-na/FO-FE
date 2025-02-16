import type {Image} from 'react-native-image-crop-picker';

export const getFormDataImages = (key: string = 'images', images: Image[]) => {
  const formData = new FormData();

  images.forEach(({path, mime}) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append(key, file);
  });

  return formData;
};
