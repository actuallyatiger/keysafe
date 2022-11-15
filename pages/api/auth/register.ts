import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // If req body contains a username and password, return those values as JSON to the user.
  if (req.body.name && req.body.email && req.body.password) {
    res.status(201); // 201 = created
    res.send({
      token: "fake-token",
    });
  } else {
    res.status(400); // 400 = bad request
    res.send({
      error: "Missing username or password",
    });
  }
}
