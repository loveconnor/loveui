'use client'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { LayoutGroup, motion } from 'motion/react'
import React, { forwardRef, useEffect, useId, useState } from 'react'
import { TouchTarget } from './button'
import { Link } from './link'

export function Sidebar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav {...props} className={clsx(className, 'flex h-full min-h-0 flex-col')} />
}

export function SidebarHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5'
      )}
    />
  )
}

export function SidebarBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8'
      )}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5'
      )}
    />
  )
}

export function SidebarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  let id = useId()

  return (
    <LayoutGroup id={id}>
      <div {...props} data-slot="section" className={clsx(className, 'flex flex-col gap-0.5')} />
    </LayoutGroup>
  )
}

export function SidebarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'hr'>) {
  return <hr {...props} className={clsx(className, 'my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5')} />
}

export function SidebarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden="true" {...props} className={clsx(className, 'mt-8 flex-1')} />
}

export function SidebarHeading({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3 {...props} className={clsx(className, 'mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400')} />
  )
}

export const SidebarItem = forwardRef(function SidebarItem(
  {
    current,
    className,
    children,
    ...props
  }: { current?: boolean; className?: string; children: React.ReactNode } & (
    | ({ href?: never } & Omit<Headless.ButtonProps, 'as' | 'className'>)
    | ({ href: string } & Omit<Headless.ButtonProps<typeof Link>, 'as' | 'className'>)
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  // Track theme live so classes update immediately on switch
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true
    const root = document.documentElement
    return root.classList.contains('dark') && !root.classList.contains('theme-light')
  })

  useEffect(() => {
    const update = () => {
      const root = document.documentElement
      setIsDark(root.classList.contains('dark') && !root.classList.contains('theme-light'))
    }
    window.addEventListener('themechange', update)
    const mo = new MutationObserver((m) => {
      if (m.some((x) => x.attributeName === 'class')) update()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      window.removeEventListener('themechange', update)
      mo.disconnect()
    }
  }, [])

  let classes = clsx(
    // Base
    'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium sm:py-2 sm:text-sm/5',
    isDark ? 'text-[#a9b1bb]' : 'text-zinc-700',
    // Leading icon/icon-only (lucide uses stroke=currentColor, so use text-*)
    '*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-5',
    isDark ? '*:data-[slot=icon]:text-[#a9b1bb]' : '*:data-[slot=icon]:text-zinc-500',
    // Trailing icon (down chevron or similar)
    '*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4',
    // Avatar
    '*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6',
    // Hover
    isDark
      ? 'data-hover:bg-white/[0.04] data-hover:text-[#e5e7eb] data-hover:*:data-[slot=icon]:text-[#e5e7eb]'
      : 'data-hover:bg-zinc-950/5 data-hover:text-zinc-900 data-hover:*:data-[slot=icon]:text-zinc-900',
    // Active
    isDark
      ? 'data-active:bg-white/[0.06] data-active:text-[#e5e7eb] data-active:*:data-[slot=icon]:text-[#e5e7eb]'
      : 'data-active:bg-zinc-950/5 data-active:text-zinc-900 data-active:*:data-[slot=icon]:text-zinc-900',
    // Current
    'data-current:bg-[rgba(96,165,250,0.12)]',
    isDark
      ? 'data-current:text-[#e5e7eb] data-current:*:data-[slot=icon]:text-[#e5e7eb]'
      : 'data-current:text-zinc-950 data-current:*:data-[slot=icon]:text-zinc-950'
  )

  return (
    <span className={clsx(className, 'relative')}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          className={clsx('absolute inset-y-2 -left-4 w-0.5 rounded-full', isDark ? 'bg-white' : 'bg-zinc-950')}
        />
      )}
      {typeof props.href === 'string' ? (
        <Headless.CloseButton
          as={Link}
          {...props}
          className={classes}
          data-current={current ? 'true' : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.CloseButton>
      ) : (
        <Headless.Button
          {...props}
          className={clsx('cursor-default', classes)}
          data-current={current ? 'true' : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  )
})

export function SidebarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'truncate')} />
}
