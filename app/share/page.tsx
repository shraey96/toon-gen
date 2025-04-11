"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShareableImageLoader } from "@/components/shareable-image-loader";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { downloadImage } from "@/lib/image-utils";

function SharePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imageUrl = searchParams.get("image-url");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      image_url: imageUrl,
    });
  }, []);

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">No Image Found</h1>
        <Button onClick={() => router.push("/app")}>Create Your Own</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full mb-8">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt="Generated image"
            fill
            className={`object-cover transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0">
              <ShareableImageLoader />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={() =>
            downloadImage(imageUrl, {
              page: "share",
            })
          }
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Download Now
        </Button>
        <Button
          onClick={() => router.push("/app")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Create Your Own Masterpiece
        </Button>
      </div>
    </div>
  );
}

export default function SharePageWrapper() {
  return (
    <Suspense fallback={<></>}>
      <SharePage />
    </Suspense>
  );
}
