import { openDB } from "idb";
import type { StoredGifItem } from "../types/gif-maker";

const DB_NAME = "gif-maker";
const GIF_STORE = "gifs";
const HOVER_PREVIEW_STORE = "hover-previews";
const VERSION = 2;

export interface StoredHoverPreviewItem {
  id: string;
  animeId: number;
  fileName: string;
  mimeType: string;
  createdAt: string;
  blob: Blob;
}

function getDB() {
  return openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(GIF_STORE)) {
        db.createObjectStore(GIF_STORE, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(HOVER_PREVIEW_STORE)) {
        const store = db.createObjectStore(HOVER_PREVIEW_STORE, { keyPath: "id" });
        store.createIndex("animeId", "animeId");
      }
    },
  });
}

export async function saveGif(item: StoredGifItem): Promise<void> {
  const db = await getDB();
  await db.put(GIF_STORE, item);
}

export async function getAllGifs(): Promise<StoredGifItem[]> {
  const db = await getDB();
  const all = await db.getAll(GIF_STORE);
  return all.reverse();
}

export async function deleteGif(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(GIF_STORE, id);
}

export async function saveHoverPreview(item: StoredHoverPreviewItem): Promise<void> {
  const db = await getDB();
  await db.put(HOVER_PREVIEW_STORE, item);
}

export async function getHoverPreviewsByAnimeId(
  animeId: number
): Promise<StoredHoverPreviewItem[]> {
  const db = await getDB();
  const items = await db.getAllFromIndex(HOVER_PREVIEW_STORE, "animeId", animeId);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteHoverPreview(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(HOVER_PREVIEW_STORE, id);
}
