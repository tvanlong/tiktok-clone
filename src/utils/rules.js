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
