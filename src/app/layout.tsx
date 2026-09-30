import type { Metadata } from "next";
import { Khand, Oswald, Poppins } from "next/font/google";
import { JsonLd } from "@/components/ui/JsonLd";
import { imagens } from "@/content/imagens";
import { site } from "@/content/site";
import "./globals.css";

// next/font/google (research R1). Khand e Poppins não são variáveis → `weight` obrigatório.
const khand = Khand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-khand",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

const titulo = "Dom Tomás Barbearia | Corte e barba em Belo Horizonte";

export const metadata: Metadata = {
  metadataBase: new URL(site.urlBase),
  title: titulo,
  description: site.descricao,
  applicationName: site.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nome,
    title: titulo,
    description: site.descricao,
    images: [
      {
        url: imagens.og.src,
        width: imagens.og.largura,
        height: imagens.og.altura,
        alt: imagens.og.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: site.descricao,
    images: [imagens.og.src],
  },
};

// Marca <html class="js"> antes da pintura: o CSS do Reveal só esconde com JS ativo (research R5).
const scriptJs = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${khand.variable} ${oswald.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptJs }} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
