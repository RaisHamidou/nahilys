

import "../../assets/style/globals.scss"
import ContextProvider from "../../context/ContextProvider"
import Script from 'next/script';



export const metadata = {
  title: "Nahilys",
  description: "Née d’une histoire personnelle, notre marque de prêt-à-porter est avant tout une histoire d’amour, de transmission et de créativité.Son nom, issu de la fusion des prénoms de mes deux enfants, symbolise l’union, l’équilibre et l’inspiration qui guident chacune de nos créations.",
}; 

export default function RootLayout({ children }) {
  return (
    <ContextProvider>
       <html lang="fr">
      <meta name="apple-mobile-web-app-title" content="Nahilys" />
      <body>
        {children}
      </body>
    </html>
    </ContextProvider>
   
  );
}
