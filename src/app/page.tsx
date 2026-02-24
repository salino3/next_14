import dynamic from "next/dynamic";
const ContactForm = dynamic(() => import("@/components/contact-form"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="rootHome dark">
      <h1 className="text-4xl font-bold p-10">Ready to Start!</h1>
      <ContactForm />
    </div>
  );
}
