import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useLocalStorage } from 'usehooks-ts';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const ThemeSwitch: React.FC = () => {
    const [storedTheme, setStoredTheme] = useLocalStorage<string>('theme', 'light');
    const [isDark, setIsDark] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        let validatedTheme = 'light';
        if (storedTheme === 'dark' || storedTheme === 'light') {
            validatedTheme = storedTheme;
        } else {
            setStoredTheme(validatedTheme); // Reset to default
        }
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(validatedTheme);
        setIsDark(validatedTheme === 'dark');
    }, [storedTheme, setStoredTheme]);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setStoredTheme(newTheme);
        setIsDark(!isDark);
    };

    if (!isHydrated) return null;

    return (
        <Switch
            checked={isDark}
            onChange={toggleTheme}
            className={classNames(
                isDark ? 'bg-gray-400' : 'bg-blue-500',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
            )}
        >
            <span className="sr-only">Toggle theme</span>
            <span
                className={classNames(
                    isDark ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            >
                <span
                    className={classNames(
                        isDark
                            ? 'opacity-0 duration-100 ease-out'
                            : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                >
                    <MoonIcon className="h-3 w-3 text-gray-400" />
                </span>
                <span
                    className={classNames(
                        isDark
                            ? 'opacity-100 duration-200 ease-in'
                            : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                >
                    <SunIcon className="h-3 w-3 text-blue-600" />
                </span>
            </span>
        </Switch>
    );
};

export default ThemeSwitch;
