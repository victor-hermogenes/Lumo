import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/data/expense.api";
import { useState } from "react";

export function ExpenseForm() {
    const qc = useQueryClient();
    const [form, setForm] = useState({ description: "", category: "general", amount_cents: 0, occurred_at: new Date().toISOString().slice(0, 10) });

    const { mutate, isPending } = useMutation({
        mutationFn: createExpense,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["expenses"] });
            setForm(prev => ({ ...prev, description: "", amount_cents: 0 }));
        },
    });

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); mutate(form); }}
            className="grid gap-3 p-4 rounded-2xl shadow-sm bg-white/70 dark:bg-neutral-900"
        >
            {/* description */}
            <input className="input" placeholder="Description" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            {/* amount */}
            <input className="input" type="number" placeholder="Amount (in cents)" value={form.amount_cents}
                onChange={e => setForm(f => ({ ...f, amount_cents: Number(e.target.value) }))} />
            {/* date */}
            <input className="input" type="date" value={form.occurred_at}
                onChange={e => setForm(f => ({ ...f, occurred_at: e.target.value }))} />
            <button disabled={isPending} className="btn-primary">{isPending ? "Saving..." : "Add expense"}</button>
        </form>
    );
}
