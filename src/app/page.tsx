import ContactForm from "@/components/contact-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="rootHome dark">
      <h1 className="text-4xl font-bold p-10">Ready to Start!</h1>
      <ContactForm />
    </div>
  );
}
