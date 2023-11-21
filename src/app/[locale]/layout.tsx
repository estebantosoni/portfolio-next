import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from './components/Navbar'
import { Provider } from './components/Provider'
import portfolio from '../assets/portfolio.png'

import {useLocale, useTranslations} from 'next-intl'
import {notFound} from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children, params}: {children: React.ReactNode, params: { locale: string }}) {
  
  const locale = useLocale();

  if(params.locale !== locale){
    notFound();
  }
  
  const t = useTranslations("navbar");

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href={portfolio.src}/>
      </head>
      <body className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-screen selection:bg-gray-50 dark:selection:bg-gray-800`}>
        <Provider>
          <Navbar props={[t("home"),t("proyects")]}/>
          <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
