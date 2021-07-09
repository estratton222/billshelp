import { ApartmentRecord } from "../../types";
import { airtableBase } from "../db/Airtable";

const TABLE_NAME = "Apartments";

const apartmentsTable = airtableBase.table(TABLE_NAME);

export async function getApartments() {
  return await apartmentsTable.select().firstPage();
}

export async function updateApartment(apartment: ApartmentRecord) {
  return await apartmentsTable.update([apartment]);
}
