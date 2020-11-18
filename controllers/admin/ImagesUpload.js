import Express from "express";
import Multer from "multer";
import MulterS3 from "multer-s3";
import AWS from "aws-sdk";

const router = Express.Router();
// Multer Configuration
const s3 = new AWS.S3({
  accessKeyId: "AKIAJNOPZAXDXZMNFLUA",
  secretAccessKey: "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",
});

const uploadS3 = Multer({
  storage: MulterS3({
    s3: s3,
    acl: "public-read",
    bucket: "blendsproducts",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

//Upload image to S3
router.post("/upload", uploadS3.single("file"), async (req, res) => {
  const file = req.file;
  console.log(file);
});

export default router;
