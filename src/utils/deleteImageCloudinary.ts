export const deleteImage = async (publicId: string) => {
  try {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUD_API_KEY;
    const apiSecret = import.meta.env.VITE_CLOUD_API_SECRET;

    // Tạo timestamp cho signature
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Tạo signature theo yêu cầu của Cloudinary
    const str = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = await generateSHA1(str);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("signature", signature);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete image");
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Hàm tạo SHA1 signature
async function generateSHA1(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
