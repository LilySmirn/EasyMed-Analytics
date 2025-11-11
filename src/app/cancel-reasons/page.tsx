'use client';

import { BackButton } from "@/components/BackButton";

export default function CancelReasonsPage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Причины отмены</h1>
            </div>

            <p>Здесь будет таблица причин отмены.</p>
        </div>
    );
}
