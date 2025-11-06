import { ThemeTokens, defaultTheme } from "./themeTokens";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const classes = (theme: ThemeTokens = defaultTheme) => ({
  // ---------------------------------------------------------
  // Containers
  // ---------------------------------------------------------
  container: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4",
  card: cn(theme.bgCard, "shadow-md rounded-xl p-4", theme.border),
  sectionTitle: cn("text-xl font-semibold mb-3", theme.textPrimary),

  // ---------------------------------------------------------
  // Buttons
  // ---------------------------------------------------------
  buttonBase:
    "px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: cn(
    "px-4 py-2 rounded-md font-medium",
    theme.accent,
    theme.accentHover,
    theme.accentRing
  ),
  buttonSecondary: cn(
    "px-4 py-2 rounded-md font-medium",
    "bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700",
    theme.textPrimary,
    "focus:ring-gray-400"
  ),
  buttonDanger: cn(
    "px-4 py-2 rounded-md font-medium",
    "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
  ),

  // ---------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------
  input: cn(
    "w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2",
    theme.bgCard,
    theme.textPrimary,
    theme.accentRing
  ),

  label: cn("text-sm font-medium select-none", theme.textPrimary),
  errorText: "text-sm text-red-500 mt-1",

  // ---------------------------------------------------------
  // Table
  // ---------------------------------------------------------
  table: cn("w-full border-collapse shadow-md rounded-lg overflow-hidden", theme.bgCard),
  tableRow: cn("border-b hover:bg-gray-100 dark:hover:bg-neutral-800 transition", theme.border),
  tableCell: cn("p-2 text-sm align-middle", theme.textPrimary),

  // ---------------------------------------------------------
  // Misc
  // ---------------------------------------------------------
  badge: (color: string) => `inline-block px-2 py-0.5 rounded text-xs font-semibold ${color}`,
  divider: cn("border-t my-4", theme.border),
  emptyState: cn("text-center py-8 italic", theme.textSecondary),
});
