import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.username === "tiger" && req.body.password === "pword") {
    res.status(200) // 200 = ok
    res.send({
      token: "fake-token",
    })
  } else {
    res.status(401) // 401 = unauthorized
    res.send({
      error: "Unauthorized",
    })
  }
}