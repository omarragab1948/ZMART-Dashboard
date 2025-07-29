import { FormProvider as Form, type UseFormReturn } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface FormProviderProps {
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
  children: React.ReactNode;
}
const FormProvider = ({ methods, onSubmit, children }: FormProviderProps) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

export default FormProvider;
