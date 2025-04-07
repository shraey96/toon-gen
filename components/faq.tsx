import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants/faq";

export default function Faq() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black border-t border-white/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to know about our image transformation service
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70 text-left">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
