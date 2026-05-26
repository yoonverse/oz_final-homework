import './globals.css';
import { Providers } from "@/components/common/Providers";
import ThemeWrapper from "@/components/layout/ThemeWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <ThemeWrapper>{children}</ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
