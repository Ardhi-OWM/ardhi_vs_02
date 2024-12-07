// components/Shared/Header
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from '@clerk/nextjs'

import ThemeSwitch from "../Reusable/Theme/ThemeSwitch";
import NavBar from "./Navigation/NavBar";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`w-full fixed top-0 left-0 z-100 border-b border-gray-500/[.25] shadow-lg
                ${isScrolled ? " backdrop-blur-md" : "bg-transparent"
                }`}
        >
            <div className="flex items-center flex-row justify-between mx-4">
                <div className="my-2">
                    <Link href="/" >
                        <Image
                            src="/logo/logo.png"
                            width={128}
                            height={64}
                            alt="Ardhi logo"
                            priority
                            className="w-24 sm:w-30 md:w-40 aspect-auto"
                        />
                    </Link>
                </div>
                <NavBar />

                <div className="flex flex-row gap-4">
                    <UserButton />
                    <ThemeSwitch />
                </div>
            </div>

        </header>
    )
}
export default Header;