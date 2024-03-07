import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      hi this is devkart
      <p className="mx-4 bg-slate-500">hi this is again me</p>
    </main>
  );
}
