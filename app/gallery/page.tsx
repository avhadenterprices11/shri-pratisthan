"use client";

import React from "react";
import GalleryHero from "@/components/gallery/hero";
import FeaturedMemories from "@/components/gallery/featured-memories";
import PhotoGallery from "@/components/gallery/photo-gallery";
import VideoGallery from "@/components/gallery/video-gallery";
import ShareMemoriesCTA from "@/components/gallery/share-memories-cta";
import GalleryFooter from "@/components/gallery/footer";

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

      {/* 6. Global Footer Map */}
      <GalleryFooter />
    </main>
  );
}
