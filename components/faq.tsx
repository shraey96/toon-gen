import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black border-t border-white/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to know about our AI image transformation
            service
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                How does it work?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-white/70">
                Our AI uses advanced machine learning models to analyze your
                photos and transform them into various artistic styles. Simply
                upload your image, choose a style, and our AI will generate a
                transformed version in seconds. The technology combines neural
                networks trained on millions of images to understand and
                recreate artistic elements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                What styles are available?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-white/70">
                We offer a wide range of styles including Pixar, Comic Book,
                Cinematic, Line Art, Watercolor, Oil Painting, Anime, 3D Render,
                Neon, Vintage, and many more. Pro and Enterprise plans have
                access to all styles, while the Starter plan includes 5 basic
                styles. We regularly add new styles based on user feedback and
                trends.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                How long does it take?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-white/70">
                Most transformations are completed within 5-15 seconds,
                depending on the complexity of the image and the selected style.
                Some highly detailed styles may take up to 30 seconds.
                Enterprise users receive priority processing for faster results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                What image formats are supported?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-white/70">
                We support all common image formats including JPG, PNG, WEBP,
                and HEIC. The maximum file size is 10MB for standard plans and
                25MB for Enterprise plans. For best results, we recommend using
                high-resolution images with clear subjects and good lighting.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                Can I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-white/70">
                Yes, you can cancel your subscription at any time. If you cancel
                within the first 7 days, you'll receive a full refund. After
                that, your subscription will remain active until the end of your
                billing period, and you won't be charged again.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
