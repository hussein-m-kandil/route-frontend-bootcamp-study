import { redirect } from 'react-router-dom';
import { SIGNIN_PATH, SIGNUP_PATH } from '../../App';
import { postSignin, postSignup } from '../../services/auth';

export const ENTRIES_NAMES = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  password: 'password',
  passwordConfirmation: 'rePassword',
};

export const fieldsValidations = {
  [ENTRIES_NAMES.name]: {
    regex: /^.{3,}$/,
    msg: 'A name must contain more than 2 characters',
    example: 'Superman',
  },
  [ENTRIES_NAMES.email]: {
    regex: RegExp(
      [
        "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/",
        '=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21',
        '\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])',
        '*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]',
        '*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))',
        '\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*',
        '[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|',
        '\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
      ].join(''),
    ),
    msg: 'Malformed email address!',
    example: 'superman@krypton.universe',
  },
  [ENTRIES_NAMES.phone]: {
    regex: /^01[0125][0-9]{8}$/,
    msg: 'Accepts only Egyptian phone numbers!',
    example: '01234567890',
  },
  [ENTRIES_NAMES.password]: {
    regex: RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    ),
    msg: [
      'Password length must be 8 or more, contain at least: ',
      '1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    ].join(''),
    example: 'Ss@12312',
  },
};

const commonEntryData = { error: '' };
const commonEntryAttrs = {
  value: '',
  autoComplete: 'on',
  'aria-invalid': false,
};

export const signinEntriesData = {
  [ENTRIES_NAMES.email]: {
    ...commonEntryData,
    attrs: {
      ...commonEntryAttrs,
      type: 'email',
      label: 'Email',
    },
  },
  [ENTRIES_NAMES.password]: {
    ...commonEntryData,
    attrs: {
      ...commonEntryAttrs,
      role: 'textbox',
      type: 'password',
      label: 'Password',
    },
  },
};

export const signupEntriesData = {
  [ENTRIES_NAMES.name]: {
    ...commonEntryData,
    attrs: {
      ...commonEntryAttrs,
      type: 'text',
      label: 'Name',
    },
  },
  [ENTRIES_NAMES.phone]: {
    ...commonEntryData,
    attrs: {
      ...commonEntryAttrs,
      type: 'tel',
      label: 'Phone',
    },
  },
  ...signinEntriesData,
  [ENTRIES_NAMES.passwordConfirmation]: {
    ...commonEntryData,
    attrs: {
      ...commonEntryAttrs,
      role: 'textbox',
      type: 'password',
      label: 'Password Confirmation',
    },
  },
};

export function validateFormData(formData) {
  const errors = {};
  formData.entries().forEach(([name, value]) => {
    if (!value) {
      errors[name] = `${signupEntriesData[name].attrs.label} is required!`;
    } else if (name === ENTRIES_NAMES.passwordConfirmation) {
      if (value !== formData.get(ENTRIES_NAMES.password)) {
        errors[name] = 'Password confirmation does not match!';
      }
    } else {
      if (!fieldsValidations[name].regex.test(value)) {
        errors[name] = fieldsValidations[name].msg;
      }
    }
  });
  if (Object.keys(errors).length) {
    return errors;
  }
}

async function sendFormData(sender, formData) {
  const { data, error } = await sender(formData);
  if (error) throw error;
  return { authData: data };
}

export async function authFormAction({ request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  formData.delete('intent');
  const formErrors = validateFormData(formData);
  if (formErrors) return { formErrors };
  try {
    if (intent === SIGNUP_PATH) {
      return await sendFormData(postSignup, formData);
    } else if (intent === SIGNIN_PATH) {
      return await sendFormData(postSignin, formData);
    } else {
      redirect(intent);
    }
  } catch (error) {
    return { submitError: error.message };
  }
}
