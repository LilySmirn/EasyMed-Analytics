export type DatasetMeta = {
    datasetKey: string;
    clinicId: string;
    from: string; // YYYY-MM-DD
    to: string; // YYYY-MM-DD
    fetchedAt: string; // ISO
    schemaVersion: 1;
};

export type VisitDiagnosis = {
    mkbCode: string;
    cr_id: string;
};

export type Visit = {
    id: string;
    datasetKey: string;
    number: string;
    date: string;
    doctorId: string;
    doctorName: string;
    specialtyId?: string;
    specialtyName?: string;
    visitType?: "primary" | "repeat" | string;
    diagnosisType: VisitDiagnosis[];
    easyMed?: boolean;
    insurance?: string | null;
};

export type Assignment = {
    id: string;
    datasetKey: string;
    visitId: string;
    code?: string;
    name?: string;
    mkbCode?: string;
    assigned: boolean;
    completed?: boolean;
    reasonNotAssigned?: string;
    price?: number;
    serviceId?: string;
};

export type Nosology = {
    id: string;
    mkbCode: string[];
    name: string;
};

export type Service = {
    id: string;
    code: string;
    name: string;
    price: number;
};

export type ClinicalRecommendationService = {
    code?: string;
    name?: string;
    is_required: boolean;
    stage: string;
};

export type ClinicalRecommendation = {
    id: string;
    source: string;
    mkbCode: string[];
    services: ClinicalRecommendationService[];
};

export type IndexedDbDatasetPayload = {
    meta: DatasetMeta;
    visits: Visit[];
    assignments: Assignment[];
    nosologies: Nosology[];
    services: Service[];
    clinicalRecommendations: ClinicalRecommendation[];
};
