import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ModeToggle } from "@/components/ButtonToggleDark";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <Button variant="destructive">Click</Button>
      <Button variant="ghost">Click</Button>
      <Button variant="outline">Click</Button>
      <Button variant="secondary">Click</Button>
      <Button variant="link">Click</Button>

      <Button className="bg-warning hover:bg-yellow-300">Click</Button>

      <Link href="/" className={buttonVariants()}>
        Go to home page
      </Link>

      <Calendar />

      <ModeToggle />
    </div>
  );
}
