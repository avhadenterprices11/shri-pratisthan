import React from "react";
import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/hero";
import FeaturedMemories from "@/components/gallery/featured-memories";
import PhotoGallery from "@/components/gallery/photo-gallery";
import VideoGallery from "@/components/gallery/video-gallery";
import ShareMemoriesCTA from "@/components/gallery/share-memories-cta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Shree Prathishthan's photographic records: Ganeshotsav arati, Dhol Tasha parades, Navratri garba, Shiv Jayanti rallies, medical camps, eco drives, and volunteer stories.",
  openGraph: {
    title: "Gallery | Shree Prathishthan",
    description:
      "Photographic records: Ganeshotsav, Dhol Tasha, Navratri garba, Shiv Jayanti, medical camps, and volunteer stories.",
    url: "https://www.shreepratishthan.org/gallery",
    images: [{ url: "/gallery_navratri_garba.png", width: 1200, height: 630, alt: "Shree Prathishthan Gallery" }],
  },
  twitter: {
    title: "Gallery | Shree Prathishthan",
    description: "Photographic records: Ganeshotsav, Navratri, Shiv Jayanti, medical camps, and volunteer stories.",
    images: ["/gallery_navratri_garba.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/gallery" },
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-transparent">
      {/* 1. Hero Landing Block */}
      <GalleryHero />

      {/* 2. Iconic Showcase */}
      <FeaturedMemories />

      {/* 3. Filtered Photo Masonry Grid with Filters */}
      <PhotoGallery />

      {/* 4. Video Reels & Lightbox */}
      <VideoGallery />

      {/* 5. Image Upload Call-out */}
      <ShareMemoriesCTA />
    </main>
  );
}
