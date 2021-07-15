import { requireSession, WithSessionProp } from "@clerk/clerk-sdk-node";
import { getApartmentsByEmail } from "../../../server/models";
import { ClerkInstance } from "../../../server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const userId = req.session?.userId as string;
      const user = await ClerkInstance.users.getUser(userId);
      const primaryEmailAddress =
        user.emailAddresses.find(
          (emailAddress) => emailAddress.id === user.primaryEmailAddressId
        )?.emailAddress || "";

      const apartments = await getApartmentsByEmail(primaryEmailAddress);
      res.status(200).json(apartments);
      break;
    default:
      res.status(405).end();
  }
}

export default requireSession(handler);
