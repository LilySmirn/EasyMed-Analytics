import { NextResponse } from "next/server";
import { appointmentsDetails } from "@/app/api/appointments/[id]/route";

export async function GET() {
    const normalizedDetails = Object.fromEntries(
        Object.entries(appointmentsDetails).map(([appointmentId, details]) => [
            appointmentId,
            details.map((detail, index) => ({
                id: `${appointmentId}-${detail.id}-${index}`,
                serviceId: detail.id,
                code: detail.id,
                name: detail.name,
                assigned: detail.assigned,
                completed: detail.done,
                reasonNotAssigned: detail.reason,
                price: detail.cost,
                isClinicalRecommendation: detail.clinical,
                isRequiredByClinicalRecommendation: Boolean(detail.mandatoryOukr),
            })),
        ])
    );

    return NextResponse.json(normalizedDetails);
}
