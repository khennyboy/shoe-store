import Link from "next/link";

function NotFound() {
    return (
        <html>
            <body>
                <main className="text-center space-y-6 mt-4 flex justify-center items-center shadow-2xl min-h-screen ">
                    <h1 className="text-3xl font-semibold">
                        This page could not be found :(
                    </h1>
                    <Link
                        href="/"
                        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
                    >
                        Go back home
                    </Link>
                </main>
            </body>
        </html>
    );
}

export default NotFound;
