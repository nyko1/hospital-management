// consultation.model.ts
export interface Consultation {
  IDCONSULTATION: string; // Assuming it's a string
  IDDOSSIERPATIENT: string;
  STATUT: string;
  TYPECONSULTATION?: string; // Optional fields
  DATECONSULTATION?: string;
  DIAGNOSTIC?: string;
  ACTEMEDICAL?: string;
  PRESCRIPTION?: string;
  CONSTANTE?: string;
}
