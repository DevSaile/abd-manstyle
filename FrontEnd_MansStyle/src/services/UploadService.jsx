import api from "../Api";

export const subirImagen = async (file) => {
    const formData = new FormData();
    formData.append("file", file); 

    try {
        const response = await api.post("upload/uploadimagen", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // debería devolver la URL o ruta
    } catch (error) {
        console.error("Error al subir imagen:", error);
        return null;
    }
};