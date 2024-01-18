const { getStorage, ref, getDownloadURL, uploadBytesResumable, uploadString } = require("firebase/storage")

async function uploadImage(file) {
    try {
        const storage = getStorage()

        const storageRef = ref(storage, `bookspace-image/${file.originalname + "       " + new Date().toISOString()}`);

        // Upload the file in the bucket storage
        const snapshot = await uploadString(storageRef, file, 'data_url')
        console.log('snapshot', { snapshot });
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