import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const title = "Multiple Inputs in Group";

const Example = () => (
  <div className="w-full max-w-md">
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            className="bg-background"
            id="first-name"
            placeholder="Connor"
            type="text"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input
            className="bg-background"
            id="last-name"
            placeholder="Love"
            type="text"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email-multi">Email</FieldLabel>
          <Input
            className="bg-background"
            id="email-multi"
            placeholder="connor@example.com"
            type="email"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  </div>
);

export default Example;
