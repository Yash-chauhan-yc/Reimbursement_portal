import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  // Check if user has finance role
  if (!session.user.roles.includes('finance')) {
    return res.status(403).json({ error: "Access denied" });
  }
  
  // Finance can see all
  const allRequests = await db.query('SELECT * FROM reimbursements');
  
  return res.json(allRequests);
}