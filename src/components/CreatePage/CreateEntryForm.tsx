import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_ENTRY } from "../../graphql/mutations";
import ImageUploader from "./ImageUploader";
import { uploadImageToStorage } from "../../utils/uploadImage";
import styles from './Create.module.scss';

const CreateEntryForm: React.FC = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [weather, setWeather] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [createEntry] = useMutation(CREATE_ENTRY);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const imageUrl = await uploadImageToStorage(image);
        if (image && !imageUrl) {
            setUploadError("Failed to upload image. Please try again.");
            setLoading(false);
            return;
        }

        try {
            await createEntry({
                variables: { date, description, weather, image: imageUrl || "" },
            });
            navigate("/");
        } catch (error) {
            console.error("Error creating entry:", error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {loading && <div className={styles.loader}>Loading...</div>} {/* Loader */}

            <div className={styles.formRow}>
                <label className={styles.formLabel}>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className={styles.formInput}
                    />
                </label>
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel}>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className={styles.formInput}
                    />
                </label>
            </div>

            <div className={styles.formRow}>
                <label className={styles.formLabel}>
                    Weather:
                    <select
                        value={weather}
                        onChange={(e) => setWeather(e.target.value)}
                        className={styles.formInput}
                    >
                        <option value="">Select Weather</option>
                        <option value="Sunny">Sunny</option>
                        <option value="Cloudy">Cloudy</option>
                        <option value="Rainy">Rainy</option>
                    </select>
                </label>
            </div>

            <div className={styles.formRow}>
                <ImageUploader onImageChange={setImage} uploadError={uploadError} />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>Save</button>
        </form>
    );
};

export default CreateEntryForm;
