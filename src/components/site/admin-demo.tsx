"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { DashboardShell } from "@/components/blocks/dashboard-shell";
import { ResourceTable, type ResourceRow, type StatusTone } from "@/components/blocks/resource-table";
import { RecordForm } from "@/components/blocks/record-form";
import { ConfirmDialog } from "@/components/blocks/confirm-dialog";
import { AuditLog, type AuditEntry } from "@/components/blocks/audit-log";
import { Button } from "@/components/primitives/button";
import { Field, Input, Select } from "@/components/primitives/form";
import { useToast } from "@/components/primitives/toast";

/**
 * End-to-end admin demo.
 *
 * The full CRUD flow assembled from the admin blocks: list with filter and
 * pagination, create, edit, a real delete confirmation, and an audit trail that
 * records every write. State is local and in memory; nothing is persisted, and
 * the delete requires typing the user's name so it is never a reflexive click.
 * Fictional people.
 */

const LOCALE = "en-GB";
const PAGE_SIZE = 5;

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Editor", label: "Editor" },
  { value: "Viewer", label: "Viewer" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Invited", label: "Invited" },
  { value: "Suspended", label: "Suspended" },
];

const statusTones: Record<string, StatusTone> = {
  Active: "positive",
  Invited: "warning",
  Suspended: "danger",
};

const seed: UserRecord[] = [
  { id: "u1", name: "Elif Saral", email: "elif@relay.co", role: "Admin", status: "Active" },
  { id: "u2", name: "Tomas Beck", email: "tomas@relay.co", role: "Editor", status: "Active" },
  { id: "u3", name: "Aylin Demir", email: "aylin@relay.co", role: "Editor", status: "Invited" },
  { id: "u4", name: "Jonas Weiss", email: "jonas@relay.co", role: "Viewer", status: "Active" },
  { id: "u5", name: "Meral Yücel", email: "meral@relay.co", role: "Admin", status: "Active" },
  { id: "u6", name: "Deniz Kaya", email: "deniz@relay.co", role: "Editor", status: "Suspended" },
  { id: "u7", name: "Lena Fischer", email: "lena@relay.co", role: "Viewer", status: "Invited" },
];

const seedAudit: AuditEntry[] = [
  {
    id: "a1",
    actor: "Elif Saral",
    action: "changed the role of",
    target: "Tomas Beck",
    detail: "from Viewer to Editor",
    timestamp: "2026-07-22T09:14:00Z",
  },
  {
    id: "a2",
    actor: "Meral Yücel",
    action: "invited",
    target: "Lena Fischer",
    timestamp: "2026-07-21T16:40:00Z",
  },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const userFields = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email" as const, required: true },
  { name: "role", label: "Role", type: "select" as const, options: roleOptions },
  { name: "status", label: "Status", type: "select" as const, options: statusOptions },
];

type View = { mode: "list" } | { mode: "create" } | { mode: "edit"; id: string };

export function AdminDemo() {
  const toast = useToast();
  const [records, setRecords] = useState<UserRecord[]>(seed);
  const [audit, setAudit] = useState<AuditEntry[]>(seedAudit);
  const [view, setView] = useState<View>({ mode: "list" });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function logAction(action: string, target: string, detail?: string) {
    setAudit((current) => [
      { id: `a-${Date.now()}`, actor: "You", action, target, detail, timestamp: new Date().toISOString() },
      ...current,
    ]);
  }

  const filtered = records.filter((record) => {
    const matchesSearch =
      !search.trim() ||
      `${record.name} ${record.email}`.toLocaleLowerCase("en-GB").includes(search.toLocaleLowerCase("en-GB"));
    const matchesRole = role === "all" || record.role === role;
    return matchesSearch && matchesRole;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const deleteTarget = records.find((record) => record.id === deleteId) ?? null;

  function onCreate(data: Record<string, string>) {
    const record: UserRecord = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role || "Viewer",
      status: data.status || "Invited",
    };
    setRecords((current) => [record, ...current]);
    logAction("added", record.name);
    toast({ title: "User added", body: `${record.name} can now be invited.` });
    setView({ mode: "list" });
  }

  function onEdit(data: Record<string, string>, id: string) {
    setRecords((current) =>
      current.map((record) => (record.id === id ? { ...record, ...data } : record)),
    );
    logAction("edited", data.name);
    toast({ title: "Changes saved", body: `${data.name} is up to date.` });
    setView({ mode: "list" });
  }

  function onConfirmDelete() {
    if (!deleteTarget) return;
    setRecords((current) => current.filter((record) => record.id !== deleteTarget.id));
    logAction("removed", deleteTarget.name);
    toast({ title: "User removed", body: `${deleteTarget.name} no longer has access.` });
    setDeleteId(null);
  }

  const editing = view.mode === "edit" ? records.find((r) => r.id === view.id) : undefined;

  return (
    <DashboardShell
      brand="Relay Admin"
      title="Team"
      items={[
        { label: "Overview", href: "#overview" },
        { label: "Team", href: "#team", active: true },
        { label: "Billing", href: "#billing" },
        { label: "Settings", href: "#settings" },
      ]}
      utility={
        view.mode === "list" ? (
          <Button size="sm" onClick={() => setView({ mode: "create" })}>
            <Plus size={15} weight="bold" aria-hidden />
            New user
          </Button>
        ) : null
      }
    >
      {view.mode === "list" ? (
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="flex flex-col gap-6">
            {/* Filter */}
            <div className="flex flex-wrap items-end gap-4">
              <Field label="Search" className="min-w-56 flex-1">
                <Input
                  type="search"
                  value={search}
                  placeholder="Name or email"
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                />
              </Field>
              <Field label="Role">
                <Select
                  options={[{ value: "all", label: "All roles" }, ...roleOptions]}
                  defaultValue="all"
                  onValueChange={(value) => {
                    setRole(value);
                    setPage(1);
                  }}
                />
              </Field>
            </div>

            <ResourceTable
              columns={columns}
              rows={pageRows as ResourceRow[]}
              statusKey="status"
              statusTones={statusTones}
              labelKey="name"
              onEdit={(id) => setView({ mode: "edit", id })}
              onDelete={(id) => setDeleteId(id)}
              page={safePage}
              pageCount={pageCount}
              onPageChange={setPage}
              empty={{
                title: "No users match",
                body: "Clear the search or role filter to see everyone.",
                action: (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setRole("all");
                    }}
                  >
                    Reset filters
                  </Button>
                ),
              }}
            />
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-8">
            <AuditLog
              title="Recent activity"
              entries={audit.slice(0, 6)}
              locale={LOCALE}
            />
          </aside>
        </div>
      ) : (
        <div className="max-w-xl">
          <RecordForm
            key={view.mode === "edit" ? view.id : "create"}
            title={view.mode === "edit" ? "Edit user" : "New user"}
            description={
              view.mode === "edit"
                ? "Update the user's details. Changes take effect immediately."
                : "Add a user to the team. They are invited by email."
            }
            fields={userFields}
            values={editing}
            submitLabel={view.mode === "edit" ? "Save changes" : "Add user"}
            onSubmit={(data) =>
              view.mode === "edit" ? onEdit(data, view.id) : onCreate(data)
            }
            onCancel={() => setView({ mode: "list" })}
          />
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        tone="danger"
        title="Remove this user?"
        description={
          deleteTarget
            ? `${deleteTarget.name} will lose access immediately. This cannot be undone.`
            : ""
        }
        confirmLabel="Remove user"
        confirmPhrase={deleteTarget?.name}
        onConfirm={onConfirmDelete}
      />
    </DashboardShell>
  );
}
