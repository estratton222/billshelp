import { requireSession, WithSessionProp } from "@clerk/clerk-sdk-node";
import { getApartmentById, updateApartment } from "../../../server/models";
import { ClerkInstance } from "../../../server/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApartmentRecord } from "../../../types";

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      const apartment = req.body as ApartmentRecord;
      const userId = req.session?.userId as string;
      /** We make sure prevent a user with different account to update the visitation status. */
      const user = await ClerkInstance.users.getUser(userId);
      const primaryEmailAddress = user.emailAddresses.find(
        (emailAddress) => emailAddress.id === user.primaryEmailAddressId
      )?.emailAddress;

      /** We check if the persisted apartment email matches the requesters. */
      const persistedApartment = await getApartmentById(apartment.id);

      if (primaryEmailAddress !== persistedApartment.fields.Email) {
        res.status(401).end();
        break;
      }

      const results = await updateApartment(apartment);
      res.status(200).json(results);
      break;
    default:
      res.status(405).end();
      break;
  }
}

export default requireSession(handler);
