import React from "react";

interface ImageUploaderProps {
    onImageChange: (file: File | null) => void;
    uploadError: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, uploadError }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onImageChange(file);
    };

    return (
        <div>
            <label>
                Image:
                <input type="file" onChange={handleChange} />
            </label>
            {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        </div>
    );
};

export default ImageUploader;
