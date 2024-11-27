import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const getInitialTheme = (): Theme => {
        // Avoid accessing localStorage on the server
        if (typeof window === 'undefined') return 'light'; // Default to light theme

        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) return storedTheme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        // Fetch initial theme on the client
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme: Theme = prevTheme === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme);
            }
            return newTheme;
        });
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
