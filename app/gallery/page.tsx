"use client";

import React, { useState } from "react";
import GalleryHero from "@/components/gallery/hero";
import FeaturedMemories from "@/components/gallery/featured-memories";
import GalleryFilters from "@/components/gallery/gallery-filters";
import PhotoGallery from "@/components/gallery/photo-gallery";
import VideoGallery from "@/components/gallery/video-gallery";
import MemoryTimeline from "@/components/gallery/memory-timeline";
import ShareMemoriesCTA from "@/components/gallery/share-memories-cta";
import GalleryFooter from "@/components/gallery/footer";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <GalleryHero />

      {/* 2. Iconic Showcase */}
      <FeaturedMemories />

      {/* 3. Category Filter Buttons */}
      <GalleryFilters 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {/* 4. Filtered Photo Masonry Grid */}
      <PhotoGallery activeCategory={activeCategory} />

      {/* 5. Video Reels & Lightbox */}
      <VideoGallery />

      {/* 6. Timeline Milestone Journey */}
      <MemoryTimeline />

      {/* 7. Image Upload Call-out */}
      <ShareMemoriesCTA />

      {/* 8. Global Footer Map */}
      <GalleryFooter />
    </main>
  );
}
