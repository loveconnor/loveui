import type { LinkItemType } from "./sheard";
import {
  Globe as GlobeIcon,
  Layers as LayersIcon,
  UserPlus as UserPlusIcon,
  ChartBar as BarChart3Icon,
  Plug as PlugIcon,
  Code as CodeIcon,
  Users as UsersIcon,
  Star as StarIcon,
  Handshake as HandshakeIcon,
  FileText as FileTextIcon,
  Shield as ShieldIcon,
  RotateCcw as RotateCcwIcon,
  Leaf as LeafIcon,
  CircleQuestionMark as HelpCircleIcon,
} from "love-ui/icons";

export const productLinks: LinkItemType[] = [
	{
		label: "AI Workspace",
		href: "#",
		description: "Build, test, and ship AI workflows from one place",
		icon: (
			<GlobeIcon
			/>
		),
	},
	{
		label: "Model Hub",
		href: "#",
		description: "Route requests across models with unified controls",
		icon: (
			<LayersIcon
			/>
		),
	},
	{
		label: "Agent Builder",
		href: "#",
		description: "Create task-specific agents for your team",
		icon: (
			<UserPlusIcon
			/>
		),
	},
	{
		label: "Observability",
		href: "#",
		description: "Monitor latency, quality, spend, and reliability",
		icon: (
			<BarChart3Icon
			/>
		),
	},
	{
		label: "Integrations",
		href: "#",
		description: "Connect Slack, Notion, GitHub, and internal tools",
		icon: (
			<PlugIcon
			/>
		),
	},
	{
		label: "API Platform",
		href: "#",
		description: "Embed secure AI workflows into your product",
		icon: (
			<CodeIcon
			/>
		),
	},
];

export const companyLinks: LinkItemType[] = [
	{
		label: "Company",
		href: "#",
		description: "Meet the team building AI operations software",
		icon: (
			<UsersIcon
			/>
		),
	},
	{
		label: "Customers",
		href: "#",
		description: "See how teams automate support and operations",
		icon: (
			<StarIcon
			/>
		),
	},
	{
		label: "Security",
		href: "#",
		icon: (
			<HandshakeIcon
			/>
		),
		description: "Review compliance, privacy, and data controls",
	},
];

export const companyLinks2: LinkItemType[] = [
	{
		label: "Docs",
		href: "#",
		icon: (
			<FileTextIcon
			/>
		),
	},
	{
		label: "Trust Center",
		href: "#",
		icon: (
			<ShieldIcon
			/>
		),
	},
	{
		label: "Changelog",
		href: "#",
		icon: (
			<RotateCcwIcon
			/>
		),
	},
	{
		label: "Blog",
		href: "#",
		icon: (
			<LeafIcon
			/>
		),
	},
	{
		label: "Support",
		href: "#",
		icon: (
			<HelpCircleIcon
			/>
		),
	},
];
