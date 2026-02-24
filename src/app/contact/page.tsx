import Image from "next/image";
import { SubmissionsChart } from "@/components/chart";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">This is contact page!</h1>
      <Button>¡Haz clic aquí!</Button>
      <Image
        src="/perro-3.jpg"
        alt="Dog Image"
        // fill // all the page
        width={200}
        height={200}
        className="object-cover"
      />
      {/* <img
        src="/perro-3.jpg"
        alt="Dog Image"
        className="absolute inset-0 h-full w-full object-cover"
      /> */}
      <SubmissionsChart />
    </div>
  );
}
