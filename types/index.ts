import type { RecordData, Attachment } from "airtable";

export type ApartmentRecord = RecordData<Apartment>;

export type Apartment = {
  "Monthly Rent": number;
  Features: string[];
  Name: string;
  Pictures: Attachment[];
  "Square Feet": number;
  "Visited?"?: boolean;
  Email?: string;
};
