import * as Strings from "~/common/strings";
import * as Data from "~/common/data";
import * as Utilities from "~/common/utilities";
import * as Credentials from "~/common/credentials";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";
import { verifiedaccess } from "googleapis/build/src/apis/verifiedaccess";

export default async (req, res) => {
  if (Strings.isEmpty(req.body.email)) {
    return res
      .status(500)
      .send({ error: "An e-mail address was not provided." });
  }

  if (Strings.isEmpty(req.body.password)) {
    return res.status(500).send({ error: "A password was not provided." });
  }

  let user = await Data.getUserByEmail({ email: req.body.email });
  if (!user) {
    const salt = BCrypt.genSaltSync(10);
    const hash = BCrypt.hashSync(req.body.password, salt);
    const double = BCrypt.hashSync(hash, salt);
    const triple = BCrypt.hashSync(double, Credentials.PASSWORD_SECRET);

    user = await Data.createUser({
      email: req.body.email,
      password: triple,
      salt,
      data: { verified: false },
    });
  } else {
    if (user.error) {
      return res
        .status(500)
        .send({ error: "We could not authenticate you (1)." });
    }

    const phaseOne = BCrypt.hashSync(req.body.password, user.salt);
    const phaseTwo = BCrypt.hashSync(phaseOne, user.salt);
    const phaseThree = BCrypt.hashSync(phaseTwo, Credentials.PASSWORD_SECRET);

    if (phaseThree !== user.password) {
      return res
        .status(500)
        .send({ error: "We could not authenticate you (2)." });
    }
  }

  const authorization = Utilities.parseAuthHeader(req.headers.authorization);
  if (authorization && !Strings.isEmpty(authorization.value)) {
    const verfied = JWT.verify(authorization.value, Credentials.JWT_SECRET);

    if (user.email === verfied.email) {
      return res.status(200).send({
        message: "You are already authenticated. Welcome back!",
        viewer: user,
      });
    }
  }

  const token = JWT.sign(
    { user: user.id, email: user.email },
    Credentials.JWT_SECRET
  );

  return res.status(200).send({ token });
};
