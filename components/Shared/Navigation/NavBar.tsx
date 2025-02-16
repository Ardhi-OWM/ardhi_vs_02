import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { headerLinks } from '../../Constants';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    function classNames(...classes: (string | boolean | undefined | null)[]): string {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Disclosure as="nav" className=" ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-300/[0.25] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {headerLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={currentPath === item.href ? 'page' : undefined}
                                        className={classNames(
                                            currentPath === item.href
                                                ? 'border-b border-green-500'
                                                : 'hover:border-b hover:border-gray-300',
                                            'rounded px-3 py-1 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {headerLinks.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={currentPath === item.href ? 'page' : undefined}
                            className={classNames(
                                currentPath === item.href
                                    ? 'border-b border-green-500'
                                    : 'hover:border-b hover:border-gray-300',
                                'block rounded-md px-3 py-1 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
