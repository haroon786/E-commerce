/* eslint-disable prettier/prettier */

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
 export const   imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

export const editFileName = (req, file, cb) =>
{
  const fileName = file.originalname.split(' ').join('-');
  const extension = FILE_TYPE_MAP[file.mimetype];
  cb(null, `${fileName}-${Date.now()}.${extension}`);
}
