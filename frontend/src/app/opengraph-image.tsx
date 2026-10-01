import { renderShareImage, shareAlt, shareSize } from "@/lib/shareImage";

export const alt = shareAlt;
export const size = shareSize;
export const contentType = "image/png";

export default function Image() {
  return renderShareImage();
}
