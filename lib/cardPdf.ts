import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

/**
 * Capture la carte (nœud DOM) en PNG haute résolution puis l'insère
 * dans un PDF au format carte 105 × 147 mm (ratio 5:7), marges zéro.
 */
export async function downloadCardPdf(
  node: HTMLElement,
  filename: string
): Promise<void> {
  const png = await toPng(node, {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: "#FDFBF7",
  });
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [105, 147],
    compress: true,
  });
  pdf.addImage(png, "PNG", 0, 0, 105, 147);
  pdf.save(filename);
}