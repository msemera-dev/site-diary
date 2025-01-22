import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ENTRY } from "../../graphql/queries";
import styles from './View.module.scss';

type Entry = {
    id: string;
    date: string;
    description: string;
    weather?: string;
    image?: string;
};

const DetailRow = ({ label, value }: { label: string, value: string | undefined }) => (
    <>
        <div className={styles.label}>{label}:</div>
        <div className={styles.value}>{value ?? "Not available"}</div>
    </>
);

function ViewPage() {
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<{ entry: Entry }>(GET_ENTRY, {
        variables: { id },
        fetchPolicy: 'network-only'
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const { entry } = data || {};

    return (
        <div className={styles.viewContainer}>
            <h1>Site Diary Entry</h1>
            <div className={styles.entryDetails}>
                <DetailRow label="Date" value={entry?.date} />
                <DetailRow label="Description" value={entry?.description} />
                <DetailRow label="Weather" value={entry?.weather} />

                <div className={styles.imageContainer}>
                    <div className={styles.label}>Image:</div>
                    <div className={styles.value}>
                        {entry?.image ? (
                            <img
                                src={entry.image}
                                alt={`Entry ${id}`}
                                className={styles.image}
                            />
                        ) : (
                            "No image available"
                        )}
                    </div>
                </div>
            </div>
            <Link to="/" className={styles.backLink}>Back to List</Link>
        </div>
    );
}

export default ViewPage;
