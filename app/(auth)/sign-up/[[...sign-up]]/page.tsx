import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-6 min-w-full">
            <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"

                appearance={{
                    elements: { footer: "hidden", formButtonPrimary: "bg-green-700" },
                }}
            />

            <div className="flex flex-row gap-1 text-sm">
                <p>Already a user?</p>
                <Link
                    href="/sign-in"
                    className="text-green-700 underline font-semibold"
                >
                    Sign in here.
                </Link>
            </div>
        </div>
    );
}
