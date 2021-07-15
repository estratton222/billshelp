import { ApartmentRecord } from "../../types";
import { airtableBase } from "../db/Airtable";

const TABLE_NAME = "Apartments";

const apartmentsTable = airtableBase.table(TABLE_NAME);

export async function getApartmentsByEmail(emailAddress: string) {
  return await apartmentsTable
    .select({ filterByFormula: `Email = '${emailAddress}'` })
    .firstPage();
}

export async function getApartmentById(apartmentId: string) {
  return await apartmentsTable.find(apartmentId);
}

export async function updateApartment(apartment: ApartmentRecord) {
  return await apartmentsTable.update([apartment]);
}
