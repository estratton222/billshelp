import { withSession, WithSessionProp, Clerk } from "@clerk/clerk-sdk-node";
import { updateApartment } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";

const clerkApiInstance = new Clerk({ apiKey: process.env.CLERK_API_KEY });

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  if (req.session && req.session.userId) {
    switch (req.method) {
      case "PUT":
        const apartment = req.body;
        const user = await clerkApiInstance.users.getUser(req.session.userId);
        const primaryEmailAddress = user.emailAddresses.find(
          (emailAddress) => emailAddress.id === user.primaryEmailAddressId
        )?.emailAddress;

        const results = await updateApartment({
          id: apartment.id,
          fields: { Email: primaryEmailAddress, ...apartment.fields },
        });
        res.status(200).json(results);
        break;
      default:
        res.status(405).end();
        break;
    }
  } else {
    res.status(401).end();
  }
}

export default withSession(handler);
