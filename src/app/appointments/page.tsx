'use client';
import { Suspense } from 'react';
import AppointmentsPageInner from './AppointmentsPageInner';

export default function AppointmentsPageWrapper() {
    return (
        <Suspense fallback={<div className="p-8">Загрузка...</div>}>
            <AppointmentsPageInner />
        </Suspense>
    );
}
