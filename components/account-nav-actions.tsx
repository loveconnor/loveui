"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut as LogOutIcon, Users as UsersIcon } from "love-ui/icons"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { proPlanLabels, type ProPlanKey } from "@/lib/pro-plans"

const BOOK_A_CALL_URL = "https://cal.com/loveconnor"

export function BookCallLink() {
  return (
    <a
      href={BOOK_A_CALL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground max-sm:hidden"
    >
      Book a Call
    </a>
  )
}

export function AccountNavActions() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [isMounted, setIsMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSigningOut, setIsSigningOut] = React.useState(false)
  const [signOutError, setSignOutError] = React.useState<string | null>(null)
  const [loginHref, setLoginHref] = React.useState("/login")
  const [proPlan, setProPlan] = React.useState<ProPlanKey | null>(null)
  const [canViewTeams, setCanViewTeams] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  async function handleSignOut() {
    setIsSigningOut(true)
    setSignOutError(null)

    const { error } = await authClient.signOut()

    if (error) {
      setSignOutError(error.message || "Unable to log out. Please try again.")
      setIsSigningOut(false)
      return
    }

    setIsOpen(false)
    authClient.$store.notify("$sessionSignal")
    router.refresh()
  }

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  React.useEffect(() => {
    const callbackUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
    setLoginHref(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }, [])

  React.useEffect(() => {
    const email = session?.user.email

    if (!email) {
      setProPlan(null)
      setCanViewTeams(false)
      return
    }

    let isActive = true

    async function loadProPlan() {
      try {
        const response = await fetch("/api/pro/access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        if (!response.ok) {
          if (isActive) {
            setProPlan(null)
          }
        } else {
          const body = (await response.json()) as { plan?: ProPlanKey }

          if (isActive) {
            setProPlan(body.plan ?? null)
          }
        }

        const teamResponse = await fetch("/api/pro/team")

        if (isActive) {
          setCanViewTeams(teamResponse.ok)
        }
      } catch {
        if (isActive) {
          setProPlan(null)
          setCanViewTeams(false)
        }
      }
    }

    loadProPlan()

    return () => {
      isActive = false
    }
  }, [session?.user.email])

  if (!isMounted || isPending) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-[178px] shrink-0 max-sm:hidden"
      />
    )
  }

  if (!session) {
    return (
      <div className="flex shrink-0 items-center gap-1.5 max-sm:hidden">
        <Link
          href={loginHref}
          className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
        >
          Log in
        </Link>
        
        <Link
          href="/pro"
          className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-fd-primary px-3 text-sm font-medium text-fd-primary-foreground shadow-sm transition-colors hover:bg-fd-primary/90"
        >
          Get Access
        </Link>
      </div>
    )
  }

  return (
    <div
      ref={menuRef}
      className="relative flex items-center gap-1.5 max-sm:hidden"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        className="inline-flex h-9 max-w-60 items-center justify-center truncate rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground data-[open=true]:bg-fd-accent data-[open=true]:text-fd-foreground"
        data-open={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="truncate">{session.user.email}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-lg border bg-fd-popover p-1 text-fd-popover-foreground shadow-lg">
          <div className="border-b px-2 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-xs text-fd-muted-foreground">
                {session.user.email}
              </p>
              {proPlan ? <ProPlanBadge plan={proPlan} /> : null}
            </div>
          </div>
          {canViewTeams ? (
            <Link
              className="mt-1 flex h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm font-medium transition-colors hover:bg-fd-accent"
              href="/teams"
              onClick={() => setIsOpen(false)}
            >
              <UsersIcon className="size-4" />
              Teams
            </Link>
          ) : null}
          <button
            type="button"
            className="mt-1 flex h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm font-medium transition-colors hover:bg-fd-accent disabled:opacity-64"
            disabled={isSigningOut}
            onClick={handleSignOut}
          >
            <LogOutIcon className="size-4" />
            {isSigningOut ? "Logging out..." : "Log out"}
          </button>
          {signOutError ? (
            <p className="px-2 py-1.5 text-xs text-red-600 dark:text-red-400">
              {signOutError}
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}

function ProPlanBadge({ plan }: { plan: ProPlanKey }) {
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
