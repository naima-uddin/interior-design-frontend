"use client";

// Media Library — every image ever uploaded to Cloudinary under
// Interior-design/, browsable by folder, with delete. This is the same grid
// used inside the image picker on every content form.

import MediaGrid from "@/components/admin/MediaGrid";

export default function MediaLibraryPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium text-ink">Media Library</h1>
      <p className="mt-1.5 text-sm font-light text-stone">
        Every image uploaded to Cloudinary, organised by content type. Upload new
        images from any content form — they&apos;ll appear here automatically.
      </p>

      <div className="mt-8">
        <MediaGrid />
      </div>
    </div>
  );
}
