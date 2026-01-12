import { MetricCard } from "@/components/MetricCard";
import { cardsData } from "./data/cards";
import "./globals.css";

export default function Home() {
    return (
        <div className="min-h-screen p-8 py-20 px-10">
            <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
                {cardsData.map((card, index) => (
                    <MetricCard
                        key={index}
                        title={card.title}
                        metrics={card.metrics}
                        total={card.total}
                    />
                ))}
            </main>
        </div>
    );
}
