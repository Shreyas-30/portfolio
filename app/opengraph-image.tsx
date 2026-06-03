import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = `${site.name} portfolio preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const projectImages = [
  {
    src: "/images/projects/spacechess/thumbnail.JPG",
    alt: "Space Chess close-up",
    x: 735,
    y: 70,
    width: 330,
    height: 210,
    rotate: "-3deg",
  },
  {
    src: "/images/projects/kiro/kiro.png",
    alt: "Kiro digital product screen",
    x: 895,
    y: 230,
    width: 245,
    height: 175,
    rotate: "4deg",
  },
  {
    src: "/images/projects/mechatronics/mechatronics_thumbnail.jpg",
    alt: "Mechatronics prototype",
    x: 680,
    y: 355,
    width: 305,
    height: 190,
    rotate: "2deg",
  },
  {
    src: "/images/projects/birdie/thumbmail.JPG",
    alt: "Machined multitool",
    x: 960,
    y: 430,
    width: 190,
    height: 125,
    rotate: "-5deg",
  },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#efece2",
          color: "#171614",
          padding: "72px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -130,
            top: -130,
            width: 430,
            height: 430,
            borderRadius: 430,
            backgroundColor: "rgba(47,84,214,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -110,
            bottom: -130,
            width: 410,
            height: 410,
            borderRadius: 410,
            backgroundColor: "rgba(23,22,20,0.055)",
          }}
        />

        {projectImages.map((image) => (
          <div
            key={image.src}
            style={{
              position: "absolute",
              left: image.x,
              top: image.y,
              width: image.width,
              height: image.height,
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(23,22,20,0.18)",
              boxShadow: "0 18px 42px rgba(23,22,20,0.18)",
              transform: `rotate(${image.rotate})`,
              background: "#e7e3d6",
            }}
          >
            <img
              src={`${site.url}${image.src}`}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            zIndex: 1,
            maxWidth: 650,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b675e",
            }}
          >
            Physical + digital product builder
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontSize: 112,
              lineHeight: 0.92,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              maxWidth: 650,
            }}
          >
            {site.name}
            <span style={{ color: "#2f54d6" }}>.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          <div
            style={{
            fontFamily:
              "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 31,
              lineHeight: 1.25,
              color: "#3f3c36",
              maxWidth: 620,
            }}
          >
            Curious builder creating meaningful physical and digital products,
            from AI apps to machining, mechatronics, and industrial design.
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 22,
              letterSpacing: "0.12em",
              color: "#6b675e",
            }}
          >
            www.kshreyas.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
