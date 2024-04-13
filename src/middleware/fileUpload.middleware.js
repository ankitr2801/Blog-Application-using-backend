import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const uploadPath = path.join(process.cwd(), );
    cb(null, './Uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });


