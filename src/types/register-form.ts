import { object, string, InferType } from 'yup';

export const registerFormSchema = object({
  name: string().required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required')
});

type RegisterFormSchemaType = InferType<typeof registerFormSchema>;

export default RegisterFormSchemaType;
