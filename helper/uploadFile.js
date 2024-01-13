const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage")

async function uploadImage(file) {
    try {
        const storage = getStorage()

        const storageRef = ref(storage, `bookspace-image/${file.originalname + "       " + new Date().toISOString()}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Re-throw the error for handling
    }
  }

module.exports = {
    uploadImage
}