"use client"

import * as React from "react"
import {
  EllipsisVertical as MoreVerticalIcon,
  LoaderCircle as LoaderCircleIcon,
  Mail as MailIcon,
  Send as SendIcon,
  Search as SearchIcon,
  Trash as TrashIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "love-ui/icons"
import { Badge } from "@/registry/default/ui/badge"
import { Button } from "@/registry/default/ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { Input } from "@/registry/default/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table"
import { cn } from "@/lib/utils"
import { proPlanLabels, type ProPlanKey } from "@/lib/pro-plans"
import type { TeamMember } from "@/lib/team-access"

type TeamManagementProps = {
  initialMembers: TeamMember[]
  ownerEmail: string
  plan: Extract<ProPlanKey, "team" | "enterprise">
}

export function TeamManagement({
  initialMembers,
  ownerEmail,
  plan,
}: TeamManagementProps) {
  const [members, setMembers] = React.useState(initialMembers)
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )
  const [isInviteOpen, setIsInviteOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [isAdding, setIsAdding] = React.useState(false)
  const [revokingEmail, setRevokingEmail] = React.useState<string | null>(null)
  const [resendingEmail, setResendingEmail] = React.useState<string | null>(null)
  const rows = React.useMemo(
    () => [
      {
        addedLabel: "Original",
        email: ownerEmail,
        role: "Owner" as const,
        status: "accepted" as const,
      },
      ...members.map((member) => ({
        addedLabel: formatDate(member.addedAt),
        email: member.email,
        role: "Member" as const,
        status: member.status,
      })),
    ],
    [members, ownerEmail]
  )
  const filteredRows = rows.filter((row) => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchesSearch =
      normalizedQuery.length === 0 ||
      row.email.toLowerCase().includes(normalizedQuery)

    return matchesSearch
  })

  async function handleAddMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsAdding(true)
    setError(null)
    setSuccessMessage(null)

    const submittedEmail = email.trim().toLowerCase()

    try {
      const response = await fetch("/api/pro/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: submittedEmail }),
      })
      const body = (await response.json()) as {
        error?: string
        members?: TeamMember[]
        sent?: boolean
      }

      if (!response.ok) {
        setMembers(body.members ?? members)
        setError(body.error ?? "Unable to add that email.")
        return
      }

      setMembers(body.members ?? [])
      setEmail("")
      setIsInviteOpen(false)
      setSuccessMessage(`Invitation sent to ${submittedEmail}.`)
    } catch {
      setError("Unable to add that email.")
    } finally {
      setIsAdding(false)
    }
  }

  async function handleRevokeMember(memberEmail: string) {
    setRevokingEmail(memberEmail)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/pro/team", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: memberEmail }),
      })
      const body = (await response.json()) as {
        error?: string
        members?: TeamMember[]
      }

      if (!response.ok) {
        setError(body.error ?? "Unable to revoke access.")
        return
      }

      setMembers(body.members ?? [])
      setSuccessMessage(`${memberEmail} access was revoked.`)
    } catch {
      setError("Unable to revoke access.")
    } finally {
      setRevokingEmail(null)
    }
  }

  async function handleResendInvitation(memberEmail: string) {
    setResendingEmail(memberEmail)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/pro/team", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "resend-invitation",
          email: memberEmail,
        }),
      })
      const body = (await response.json()) as {
        error?: string
        members?: TeamMember[]
      }

      if (!response.ok) {
        setMembers(body.members ?? members)
        setError(body.error ?? "Unable to resend invitation.")
        return
      }

      setMembers(body.members ?? [])
      setSuccessMessage(`Invitation resent to ${memberEmail}.`)
    } catch {
      setError("Unable to resend invitation.")
    } finally {
      setResendingEmail(null)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-14 sm:px-6 lg:px-8">
        <section className="border-b pb-12">
          <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-muted-foreground text-sm">
                  Teams
                </p>
                <PlanBadge plan={plan} />
              </div>
              <h1 className="mt-4 max-w-3xl text-balance font-medium text-4xl tracking-normal md:text-5xl">
                Team Members
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-muted-foreground text-lg leading-8">
                View and manage teammates with access to LoveUI Pro under your{" "}
                {proPlanLabels[plan]} license.
              </p>
          </div>
        </section>

        <section className="pt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 z-10 size-5 text-muted-foreground" />
              <Input
                className="h-11 text-base [&_[data-slot=input]]:ps-11"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                type="search"
                value={query}
              />
            </div>
            <InviteMemberDialog
              email={email}
              error={error}
              isAdding={isAdding}
              isOpen={isInviteOpen}
              onEmailChange={(value) => {
                setEmail(value)
                setError(null)
                setSuccessMessage(null)
              }}
              onOpenChange={(open) => {
                setIsInviteOpen(open)
                if (open) {
                  setError(null)
                  setSuccessMessage(null)
                }
              }}
              onSubmit={handleAddMember}
            />
          </div>

          {successMessage ? (
            <div className="mt-4">
              <StatusMessage tone="success">{successMessage}</StatusMessage>
            </div>
          ) : null}
          {error && !isInviteOpen ? (
            <div className="mt-4">
              <StatusMessage tone="error">{error}</StatusMessage>
            </div>
          ) : null}

          <div className="mt-10 overflow-hidden rounded-2xl border bg-background">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-14 pl-6 text-base text-muted-foreground">
                    Email
                  </TableHead>
                  <TableHead className="h-14 text-base text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="h-14 text-base text-muted-foreground">
                    Added date
                  </TableHead>
                  <TableHead className="h-14 w-12 pr-4" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.map((row) => (
                  <AccessRow
                    addedLabel={row.addedLabel}
                    email={row.email}
                    key={`${row.role}-${row.email}`}
                    onResend={
                      row.role === "Member" && row.status === "pending"
                        ? () => handleResendInvitation(row.email)
                        : undefined
                    }
                    onRevoke={
                      row.role === "Member"
                        ? () => handleRevokeMember(row.email)
                        : undefined
                    }
                    isResending={resendingEmail === row.email}
                    isRevoking={revokingEmail === row.email}
                    role={row.role}
                    status={row.status}
                  />
                ))}
                {filteredRows.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="px-6 py-14">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="flex size-10 items-center justify-center rounded-full border bg-muted/30">
                          <UsersIcon className="size-5" />
                        </span>
                        <p className="mt-4 font-medium">No members found</p>
                        <p className="mt-1 max-w-sm text-muted-foreground text-sm">
                          Try a different search or add a new team member.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  )
}

function InviteMemberDialog({
  email,
  error,
  isAdding,
  isOpen,
  onEmailChange,
  onOpenChange,
  onSubmit,
}: {
  email: string
  error: string | null
  isAdding: boolean
  isOpen: boolean
  onEmailChange: (value: string) => void
  onOpenChange: (open: boolean) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button className="h-11 px-5" />}>
        <UserPlusIcon className="size-4" />
        Add Member
      </DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <form className="grid gap-5" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
            <DialogDescription>
              Add an email address to grant access to LoveUI Pro.
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel htmlFor="team-member-email">Email address</FieldLabel>
            <div className="relative w-full">
              <MailIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
              <FieldControl
                autoFocus
                className="pl-9"
                id="team-member-email"
                name="email"
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="teammate@example.com"
                required
                type="email"
                value={email}
              />
            </div>
            <FieldDescription>
              Access starts after they accept the invitation email.
            </FieldDescription>
          </Field>

          {error ? <StatusMessage tone="error">{error}</StatusMessage> : null}

          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button disabled={isAdding} type="submit">
              {isAdding ? (
                <>
                  <LoaderCircleIcon className="size-4 animate-spin" />
                  Adding
                </>
              ) : (
                <>
                  <UserPlusIcon className="size-4" />
                  Add teammate
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

function AccessRow({
  addedLabel,
  email,
  isResending,
  isRevoking,
  onResend,
  onRevoke,
  role,
  status,
}: {
  addedLabel: string
  email: string
  isResending?: boolean
  isRevoking?: boolean
  onResend?: () => void
  onRevoke?: () => void
  role: "Member" | "Owner"
  status: "accepted" | "pending"
}) {
  const isMenuBusy = isResending || isRevoking

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="h-20 pl-6">
        <p className="truncate font-medium text-base">{email}</p>
      </TableCell>
      <TableCell>
        <Badge className="rounded-full px-3 py-1 text-sm" variant="secondary">
          {status === "accepted" ? "Accepted" : "Pending"}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground text-base">
        {addedLabel}
      </TableCell>
      <TableCell className="pr-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                aria-label={`Actions for ${email}`}
                className="size-10 text-muted-foreground hover:bg-muted hover:text-foreground [&_svg]:size-5"
                size="icon"
                variant="ghost"
              />
            }
          >
            {isMenuBusy ? (
              <LoaderCircleIcon className="size-5 animate-spin" />
            ) : (
              <MoreVerticalIcon className="size-5" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {role === "Owner" ? (
              <DropdownMenuItem disabled>Owner access</DropdownMenuItem>
            ) : null}
            {onResend ? (
              <DropdownMenuItem onClick={onResend} disabled={isMenuBusy}>
                <SendIcon className="size-4" />
                Resend invitation
              </DropdownMenuItem>
            ) : null}
            {onRevoke ? (
              <DropdownMenuItem
                onClick={onRevoke}
                variant="destructive"
                disabled={isMenuBusy}
              >
                <TrashIcon className="size-4" />
                Revoke access
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

function PlanBadge({ plan }: { plan: ProPlanKey }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-[3px] px-1.5 py-0.5 text-[10px] font-medium uppercase leading-none text-white",
        plan === "individual" && "bg-[#0d74fd]",
        plan === "team" && "bg-emerald-600",
        plan === "enterprise" && "bg-amber-600"
      )}
    >
      {proPlanLabels[plan]}
    </span>
  )
}

function StatusMessage({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: "error" | "success"
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-sm",
        tone === "error" &&
          "border-destructive/20 bg-destructive/5 text-destructive-foreground",
        tone === "success" &&
          "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200"
      )}
    >
      {children}
    </div>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}
