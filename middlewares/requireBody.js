export default function requireBody(fields) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).send("Request body required");
    }

    const missingFields = fields.filter((field) => !(field in req.body));
    if (missingFields.length > 0) {
      return res
        .status(400)
        .send(`Required fields are missing: ${missingFields.join(", ")}`);
    }

    next();
  };
}
