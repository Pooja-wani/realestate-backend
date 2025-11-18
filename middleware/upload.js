const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const uploadDir = path.join(__dirname, '..', (process.env.UPLOAD_DIR || 'uploads'));
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

async function cropTo450x350(filePath) {
  // Create cropped output file path
  const out = filePath.replace(/(\.[\w\d_-]+)$/i, "-crop.webp");

  // Convert + resize image
  await sharp(filePath)
    .resize(450, 350, { fit: "cover" })
    .toFormat("webp")
    .toFile(out);

  // IMPORTANT:
  // Do NOT delete the original — Windows locks it
  // This avoids EBUSY error permanently

  return path.basename(out);
}


module.exports = { upload, uploadDir, cropTo450x350 };
