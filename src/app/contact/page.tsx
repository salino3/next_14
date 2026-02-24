import { SubmissionsChart } from "@/components/chart";
import RichEditor from "@/components/rich-editor/rich-editor";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">This is contact page!</h1>
      <Button>¡Haz clic aquí!</Button>
      <SubmissionsChart />
    </div>
  );
}
