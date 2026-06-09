import { db } from "@/lib/db"
import {
  createDefaultBuilderDocument,
  isBuilderFramework,
  normalizeBuilderDocument,
  type BuilderDocument,
  type BuilderFramework,
  type BuilderProject,
} from "@/lib/builder/types"

type BuilderProjectRow = {
  id: string
  user_id: string
  name: string
  framework: string
  document: unknown
  tldraw_snapshot: unknown | null
  created_at: Date | string
  updated_at: Date | string
  last_exported_at: Date | string | null
}

type BuilderProjectColumns = {
  hasUserId: boolean
  hasOwnerUserId: boolean
}

let builderProjectColumnsPromise: Promise<BuilderProjectColumns> | null = null

export async function listBuilderProjects(userId: string) {
  const owner = await getOwnerColumnSql()
  const result = await db.query<BuilderProjectRow>(
    `select id, ${owner.select} as user_id, name, framework, document, tldraw_snapshot, created_at, updated_at, last_exported_at
     from builder_projects
     where ${owner.where} = $1
     order by updated_at desc`,
    [userId]
  )

  return result.rows.map(mapBuilderProjectRow)
}

export async function getBuilderProject(userId: string, projectId: string) {
  const owner = await getOwnerColumnSql()
  const result = await db.query<BuilderProjectRow>(
    `select id, ${owner.select} as user_id, name, framework, document, tldraw_snapshot, created_at, updated_at, last_exported_at
     from builder_projects
     where ${owner.where} = $1 and id = $2
     limit 1`,
    [userId, projectId]
  )

  return result.rows[0] ? mapBuilderProjectRow(result.rows[0]) : null
}

export async function createBuilderProject({
  userId,
  name = "Untitled builder project",
  framework = "next",
}: {
  userId: string
  name?: string
  framework?: BuilderFramework
}) {
  const document = createDefaultBuilderDocument(framework)
  const columns = await getBuilderProjectColumns()
  const ownerColumns =
    columns.hasUserId && columns.hasOwnerUserId
      ? `"user_id", "owner_user_id"`
      : columns.hasOwnerUserId
        ? `"owner_user_id"`
        : `"user_id"`
  const ownerValues =
    columns.hasUserId && columns.hasOwnerUserId ? "$1, $1" : "$1"
  const owner = await getOwnerColumnSql()
  const result = await db.query<BuilderProjectRow>(
    `insert into builder_projects (${ownerColumns}, name, framework, document)
     values (${ownerValues}, $2, $3, $4::jsonb)
     returning id, ${owner.select} as user_id, name, framework, document, tldraw_snapshot, created_at, updated_at, last_exported_at`,
    [userId, name.trim() || "Untitled builder project", framework, JSON.stringify(document)]
  )

  return mapBuilderProjectRow(result.rows[0])
}

export async function updateBuilderProject({
  userId,
  projectId,
  name,
  framework,
  document,
  tldrawSnapshot,
}: {
  userId: string
  projectId: string
  name?: string
  framework?: BuilderFramework
  document?: BuilderDocument
  tldrawSnapshot?: unknown
}) {
  const existing = await getBuilderProject(userId, projectId)

  if (!existing) return null

  const owner = await getOwnerColumnSql()
  const nextFramework = framework ?? existing.framework
  const nextDocument = document
    ? normalizeBuilderDocument(document, nextFramework)
    : existing.document

  const result = await db.query<BuilderProjectRow>(
    `update builder_projects
     set name = $3,
         framework = $4,
         document = $5::jsonb,
         tldraw_snapshot = $6::jsonb,
         updated_at = current_timestamp
     where ${owner.where} = $1 and id = $2
     returning id, ${owner.select} as user_id, name, framework, document, tldraw_snapshot, created_at, updated_at, last_exported_at`,
    [
      userId,
      projectId,
      name?.trim() || existing.name,
      nextFramework,
      JSON.stringify({ ...nextDocument, framework: nextFramework }),
      JSON.stringify(tldrawSnapshot ?? existing.tldrawSnapshot ?? null),
    ]
  )

  return result.rows[0] ? mapBuilderProjectRow(result.rows[0]) : null
}

export async function deleteBuilderProject(userId: string, projectId: string) {
  const owner = await getOwnerColumnSql()
  const result = await db.query(
    `delete from builder_projects where ${owner.where} = $1 and id = $2`,
    [userId, projectId]
  )

  return (result.rowCount ?? 0) > 0
}

export async function markBuilderProjectExported(userId: string, projectId: string) {
  const owner = await getOwnerColumnSql()
  await db.query(
    `update builder_projects
     set last_exported_at = current_timestamp, updated_at = current_timestamp
     where ${owner.where} = $1 and id = $2`,
    [userId, projectId]
  )
}

function mapBuilderProjectRow(row: BuilderProjectRow): BuilderProject {
  const framework = isBuilderFramework(row.framework) ? row.framework : "next"

  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    framework,
    document: normalizeBuilderDocument(row.document, framework),
    tldrawSnapshot: row.tldraw_snapshot,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
    lastExportedAt: row.last_exported_at ? toIso(row.last_exported_at) : null,
  }
}

function toIso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

async function getBuilderProjectColumns() {
  builderProjectColumnsPromise ??= db
    .query<{ column_name: string }>(
      `select column_name
       from information_schema.columns
       where table_schema = current_schema()
         and table_name = 'builder_projects'
         and column_name in ('user_id', 'owner_user_id')`
    )
    .then((result) => {
      const columns = new Set(result.rows.map((row) => row.column_name))

      return {
        hasUserId: columns.has("user_id"),
        hasOwnerUserId: columns.has("owner_user_id"),
      }
    })

  return builderProjectColumnsPromise
}

async function getOwnerColumnSql() {
  const columns = await getBuilderProjectColumns()

  if (columns.hasUserId && columns.hasOwnerUserId) {
    return {
      select: `coalesce("user_id", "owner_user_id")`,
      where: `coalesce("user_id", "owner_user_id")`,
    }
  }

  if (columns.hasOwnerUserId) {
    return {
      select: `"owner_user_id"`,
      where: `"owner_user_id"`,
    }
  }

  return {
    select: `"user_id"`,
    where: `"user_id"`,
  }
}
