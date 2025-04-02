import { useParams } from 'next/navigation';

export default function RestaurantDetailPage() {
    const { id } = useParams();

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">Détail du restaurant : {id}</h1>
        </main>
    );
}
