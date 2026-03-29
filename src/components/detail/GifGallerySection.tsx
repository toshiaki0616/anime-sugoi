import { motion } from "framer-motion";
import type { AnimeGifItem } from "../../data/animeGifGallery";

interface Props {
  items: AnimeGifItem[];
}

export default function GifGallerySection({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="gif-gallery-section">
      <div className="gif-gallery-header">
        <span className="detail-panel-kicker">LOCAL MEDIA</span>
        <h2 className="section-title">GIF ギャラリー</h2>
      </div>

      <div className="gif-gallery-grid">
        {items.map((item, index) => (
          <motion.figure
            key={`${item.src}-${index}`}
            className="gif-gallery-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <div className="gif-gallery-frame">
              <img
                src={item.src}
                alt={item.alt}
                className="gif-gallery-image"
                loading="lazy"
              />
              <span className="gif-gallery-badge">
                LOOP {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="gif-gallery-caption">
              <span className="gif-gallery-title">{item.title}</span>
              {item.note && <span className="gif-gallery-note">{item.note}</span>}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
