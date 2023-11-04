import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .email('Email is invalid')
    .min(8, 'Email must be at least 8 characters')
    .max(160, 'Email must not exceed 160 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(160, 'Password must not exceed 160 characters')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .min(6, 'Confirm password must be at least 6 characters')
    .max(160, 'Confirm password must not exceed 160 characters')
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Confirm password does not match')
})

export const schemaLogin = yup.object({
  email: yup
    .string()
    .email('Email is invalid')
    .min(8, 'Email must be at least 8 characters')
    .max(160, 'Email must not exceed 160 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(160, 'Password must not exceed 160 characters')
    .required('Password is required')
})

export const userSchema = yup.object({
  first_name: yup
    .string()
    .min(3, 'First name must be at least 3 characters')
    .max(160, 'First name must not exceed 160 characters')
    .required('First name is required'),
  last_name: yup
    .string()
    .min(3, 'Last name must be at least 3 characters')
    .max(160, 'Last name must not exceed 160 characters')
    .required('Last name is required'),
  nickname: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(160, 'Name must not exceed 160 characters')
    .required('Name is required'),
  bio: yup.string().max(80, 'Bio must not exceed 80 characters').required('Bio is required')
})
