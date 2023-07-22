import React, { useCallback } from 'react';
import * as yup from 'yup';

export const seYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export interface CreateDataFormDto {
  name: string;
  content: string;
  expiration_date: Date | string;
  password: string;
}

export const createSecretInfoFormValidationSchema = yup.object({
  name: yup.string().required('Name is required').max(250),
  content: yup.string().required('Content is required').max(100000),
  password: yup.string().required('Password is required').max(100),
});
