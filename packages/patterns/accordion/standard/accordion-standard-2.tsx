import { faker } from "@faker-js/faker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const title = "Standard with Left Chevron";

const data: { value: string; title: string; content: string }[] = [];

for (const _ of new Array(4).fill(0)) {
  data.push({
    value: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
  });
}

const Example = () => (
  <Accordion
    className="-space-y-px w-full max-w-md"
    collapsible
    defaultValue={data[0].value}
    type="single"
  >
    {data.map((item) => (
      <AccordionItem
        className="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg last:border-b"
        key={item.value}
        value={item.value}
      >
        <AccordionTrigger className="flex-row-reverse px-4 py-3 hover:no-underline [&_span]:flex-1">
          <span>{item.title}</span>
        </AccordionTrigger>
        <AccordionContent className="px-4 ps-11 pb-4">
          <p className="text-muted-foreground">{item.content}</p>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default Example;
