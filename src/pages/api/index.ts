import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';
import { registerFormSchema } from '../../types/register-form';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      await registerFormSchema.validate(req.body, {
        strict: true,
        abortEarly: false,
        stripUnknown: true
      });
    } catch (error) {
      // if error is a yup validation eror return 422 else throw the error
      if (error instanceof ValidationError) {
        res.status(422).json({
          message: 'Unprocessable Entity',
          errors: error.errors
        });
      } else {
        res.status(500).json({ message: `Something went wrong.` });
      }
      return;
    }

    res.status(200).json({ message: 'John Doe' });
  }
};

export default handler;
