import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="h-screen flex flex-col gap-6 justify-center items-center min-w-screen">
            <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                fallbackRedirectUrl="/"
                appearance={{
                    elements: { footer: "hidden", formButtonPrimary: "bg-green-700" },
                }}
            />

            <div className="flex flex-row gap-2 text-sm">
                <p>Not a user ?</p>
                <Link
                    href="/sign-up"
                    className="text-green-700 underline font-semibold"
                >
                    Sign up here.
                </Link>
            </div>
        </div>

    );
}
