import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ENTRIES } from "../../graphql/queries";
import styles from './List.module.scss';

type Entry = {
    id: string;
    date: string;
    description: string;
};

const ListPage: React.FC = () => {
    const { loading, error, data } = useQuery<{ entries: Entry[] }>(GET_ENTRIES, { fetchPolicy: 'network-only' });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const limitDescription = (description: string, maxLength: number) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        }
        return description;
    };

    return (
        <div className={styles.listContainer}>
            <h1 className={styles.header}>Site Diaries</h1>
            {data?.entries.map((entry, index) => (
                <span key={index} className={styles.listItem}>
                    <Link className={styles.itemLink} to={`/view/${entry.id}`}>
                        <strong>{entry.date}</strong> - {limitDescription(entry.description, 50)}
                    </Link>
                </span>
            ))}
            <Link className={styles.createBtn} to="/create">Create New Entry</Link>
        </div>
    );
}

export default ListPage;
