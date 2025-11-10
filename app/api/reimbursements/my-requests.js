// pages/api/reimbursements/my-requests.js
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const employeeId = session.user.employee_id;
  
  const requests = await db.query(
    'SELECT * FROM reimbursements WHERE employee_id = $1',
    [employeeId]
  );
  
  return res.json(requests);
}