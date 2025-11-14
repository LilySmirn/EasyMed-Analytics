'use client';

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card } from "@/components/Card";
import { StatisticsTable, Statistic } from "@/components/StatisticsTable";

export default function CancelReasonsPage() {
    const [statistics, setStatistics] = useState<Statistic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStatistics() {
            try {
                const res = await fetch("/api/statistics");
                const data: Statistic[] = await res.json();
                setStatistics(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchStatistics();
    }, []);

    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Статистика</h1>
            </div>

            <div className="flex flex-col gap-6">

                <Card className="w-full">
                    <p className="text-lg font-bold mb-3 text-black">
                        Анализ причин отмены
                    </p>
                    <p>Нет данных</p>
                </Card>

                <div className="flex gap-6">
                    <Card className="basis-[65%]">
                        <p className="text-lg font-bold mb-3 text-black">
                            Анализ кодов МКБ
                        </p>

                        {loading ? (
                            <p>Загрузка...</p>
                        ) : (
                            <StatisticsTable data={statistics} />
                        )}

                    </Card>

                    <Card className="basis-[35%] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-[60px]">
                            <div className="text-center">
                                <p className="text-2xl font-medium mb-3 text-black">
                                    Сколько раз<br />был открыт изимед
                                </p>
                                <p className="text-5xl font-bold text-black">
                                    3352
                                </p>
                            </div>

                            <div className="text-center">
                                <p className="text-2xl font-medium mb-3 text-black">
                                    % покрытия приемов<br />в клинике
                                </p>
                                <p className="text-5xl font-bold text-black">
                                    67%
                                </p>
                            </div>
                        </div>

                    </Card>
                </div>

            </div>
        </div>
    );
}
