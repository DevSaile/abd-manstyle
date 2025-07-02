import api from "../Api";

export const subirImagen = async (file, nombreFinal) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("nombreFinal", nombreFinal); 

  try {
    const response = await api.post("/upload/uploadimagen", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return null;
  }
};

export const eliminarImagen = async (imageUrl) => {
  try {

    const urlRelativa = new URL(imageUrl).pathname;
    const response = await api.delete("/upload/eliminarimagen", {
      params: { imageUrl: urlRelativa }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    throw error; 
  }
};

