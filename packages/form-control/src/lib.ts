import { Controller, FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';

// export interface IFormService {
//   useForm: typeof useForm;
//   FormProvider: typeof FormProvider;
//   useFormContext: typeof useFormContext;
//   Controller: typeof Controller;
// }

export class FormService {
  methods: UseFormReturn | null = null;

  useForm(config: any) {
    this.methods = useForm({ ...config });
  }

  useFormContext() {
    return useFormContext();
  }

  get Controller(): typeof Controller {
    return Controller;
  }

  get FormProvider() {
    return FormProvider;
  }
}
