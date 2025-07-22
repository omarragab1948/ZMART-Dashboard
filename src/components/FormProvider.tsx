import { FormProvider as Form, type UseFormReturn } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface FormProviderProps {
  mehtods: UseFormReturn<any>;
  onSubmit: VoidFunction;
  children: React.ReactNode;
}
const FormProvider = ({ mehtods, onSubmit, children }: FormProviderProps) => {
  return (
    <Form {...mehtods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

export default FormProvider;
