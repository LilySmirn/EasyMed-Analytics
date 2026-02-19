'use client';
import { Suspense } from 'react';
import AppointmentsPageInner from './AppointmentsPageInner';

export default function AppointmentsPageWrapper() {
    return (
        <Suspense fallback={<div className="px-4 py-6 sm:px-6 lg:px-4">Загрузка...</div>}>
            <AppointmentsPageInner />
        </Suspense>
    );
}
