import { withSession, WithSessionProp } from "@clerk/clerk-sdk-node";
import { getApartments } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  /** Allow only logged in users to view the apartments. */
  if (req.session) {
    const apartments = await getApartments();
    res.status(200).json(apartments);
  } else {
    res.status(401).end();
  }
}

export default withSession(handler);
