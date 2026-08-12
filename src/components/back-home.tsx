import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackHome = () => (
    <Link
        href="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 bg-paper text-ink text-sm font-medium px-3 py-2 border border-ink shadow-hard-sm hover:bg-gold hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
    >
        <ArrowLeft className="w-3.5 h-3.5" />
        Home
    </Link>
);

export default BackHome;
