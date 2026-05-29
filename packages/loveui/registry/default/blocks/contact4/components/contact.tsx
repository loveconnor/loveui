import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import { MailIcon, PhoneIcon } from "lucide-react";

const contactInfo = [
	{
		icon: (
			<MailIcon
			/>
		),
		label: "Email",
		value: "hello@loveui.dev",
	},
	{
		icon: (
			<PhoneIcon
			/>
		),
		label: "Phone",
		value: "+1 555 014 2026",
	},
];

export function ContactSection() {
	return (
		<div className="relative mx-auto grid h-full w-full max-w-4xl rounded-2xl border md:grid-cols-[1fr_0.70fr]">
			<div className="col-span-1 flex flex-col space-y-4 p-8 lg:p-10">
				<h1 className="font-medium text-2xl tracking-wide md:text-3xl">
					Contact LoveUI
				</h1>
				<p className="max-w-md text-muted-foreground text-sm leading-relaxed md:text-base">
					Have a question about components, blocks, registry setup, or using
					LoveUI in your product? Send a note here.
				</p>
				<p className="max-w-md text-muted-foreground text-xs leading-relaxed md:text-sm">
					Connor Love reviews product UI questions and implementation feedback.
				</p>
				<div className="grid gap-4">
					{contactInfo?.map((info) => (
						<ContactInfo key={info.label} {...info} />
					))}
				</div>
			</div>
			<div className="col-span-1 flex items-center border-t p-8 md:border-t-0 md:border-l">
				<ContactForm />
			</div>
		</div>
	);
}

function ContactForm() {
	return (
		<form className="w-full">
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="full-name">Full name</FieldLabel>
					<Input autoComplete="off" id="full-name" placeholder="Connor Love" />
				</Field>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						autoComplete="off"
						id="email"
						placeholder="you@example.com"
						type="email"
					/>
				</Field>
				<Field>
					<FieldLabel htmlFor="phone">Phone</FieldLabel>
					<Input
						autoComplete="off"
						id="phone"
						placeholder="+1 (555) 123-4567"
						type="tel"
					/>
				</Field>
				<Field>
					<FieldLabel htmlFor="message">Message</FieldLabel>
					<Textarea
						autoComplete="off"
						id="message"
						placeholder="Tell us what you are building with LoveUI"
					/>
				</Field>
			</FieldGroup>
			<Button className="mt-8 w-full" type="button">
				Submit
			</Button>
		</form>
	);
}

type ContactInfoProps = React.ComponentProps<"div"> & {
	icon: React.ReactNode;
	label: string;
	value: string;
};

function ContactInfo({
	icon,
	label,
	value,
	className,
	...props
}: ContactInfoProps) {
	return (
		<div className={cn("flex items-center gap-3 py-3", className)} {...props}>
			<div className="rounded-lg border bg-card p-3 shadow-xs [&_svg]:size-5">
				{icon}
			</div>
			<div>
				<p className="font-medium">{label}</p>
				<p className="text-muted-foreground text-xs">{value}</p>
			</div>
		</div>
	);
}
