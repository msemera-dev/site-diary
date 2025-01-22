import React from "react";
import CreateEntryForm from "./CreateEntryForm";
import styles from './Create.module.scss';

const CreatePage: React.FC = () => {
    return (
        <div className={styles.createContainer}>
            <h1>New Site Diary</h1>
            <CreateEntryForm />
        </div>
    );
};

export default CreatePage;
