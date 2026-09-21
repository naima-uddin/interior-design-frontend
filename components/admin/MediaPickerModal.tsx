"use client";

// Full-screen modal wrapping MediaGrid in "selectable" mode — lets a form
// field reuse an image already uploaded to Cloudinary instead of uploading a
// new one.

import MediaGrid from "./MediaGrid";
import type { MediaItem } from "@/lib/adminApi";

export default function MediaPickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (item: MediaItem) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <h2 className="font-serif text-xl font-medium text-ink">Choose from library</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-ink/60 transition hover:bg-cream-200 hover:text-ink"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto p-6">
          <MediaGrid
            selectable
            deletable={false}
            onSelect={(item) => {
              onSelect(item);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
