import { checkSchema, validationResult } from "express-validator";

export default function validate(schema) {
  return [checkSchema(schema), (req, res, next) => {
    const result = validationResult(req);

    if(!result.isEmpty()) {
      res.status(400);
      res.json({
        message: "Malformed Request",
        errors: result.errors,
      });
    } else {
      next();
    }
  }];
}
