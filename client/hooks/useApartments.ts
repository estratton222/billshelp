import { useEffect, useState } from "react";
import type { ApartmentRecord } from "../../types";

export function useApartments() {
  const [areApartmentsLoading, setAreApartmentsLoading] = useState(false);
  const [apartments, setApartments] = useState<ApartmentRecord[]>([]);
  const [apartmentsRetrievalError, setApartmentsRetrievalError] =
    useState(null);

  useEffect(() => {
    const retrieveApartments = async function () {
      setAreApartmentsLoading(true);
      try {
        const apartments = (await (
          await fetch(`/api/apartments`)
        ).json()) as ApartmentRecord[];
        setApartments(apartments);
      } catch (err) {
        setApartmentsRetrievalError(err);
      } finally {
        setAreApartmentsLoading(false);
      }
    };

    retrieveApartments();
  }, []);

  const updateApartment = async function (apartment: Partial<ApartmentRecord>) {
    try {
      const response = await fetch(`/api/apartments/${apartment.id}`, {
        method: "PUT",
        body: JSON.stringify(apartment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const [updatedApartment] = await response.json();

      /** Find the changed apartment and replace it. */
      const updatedApartmentIndex = apartments.findIndex(
        (apartment) => apartment.id === updatedApartment.id
      );
      apartments.splice(updatedApartmentIndex, 1, updatedApartment);

      setApartments([...apartments]);
    } catch (err) {
      throw err;
    }
  };

  return {
    apartments,
    apartmentsRetrievalError,
    areApartmentsLoading,
    updateApartment,
  };
}
