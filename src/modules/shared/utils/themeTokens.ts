export interface ThemeTokens {
  accent: string;       
  accentHover: string;    
  accentRing: string;     
  bgCard: string;       
  textPrimary: string;   
  textSecondary: string;  
  border: string;       
}

export const defaultTheme: ThemeTokens = {
  accent: "bg-blue-500 text-white",
  accentHover: "hover:bg-blue-600",
  accentRing: "focus:ring-blue-400",
  bgCard: "bg-white dark:bg-neutral-900",
  textPrimary: "text-gray-800 dark:text-gray-100",
  textSecondary: "text-gray-500 dark:text-gray-400",
  border: "border-gray-200 dark:border-neutral-800",
};

export const redTheme: ThemeTokens = {
  ...defaultTheme,
  accent: "bg-red-500 text-white",
  accentHover: "hover:bg-red-600",
  accentRing: "focus:ring-red-400",
};
