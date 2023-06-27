import "../styles/globals.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import NProgress from 'nprogress';
import '../public/nprogress.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ip, setip] = useState("")
  const [listBan, setlistBan] = useState([])
  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.country.is/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setip(data.ip)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ban`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Kết nối server thất bại!");
        }
        setlistBan(data.list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if(listBan?.includes(ip)){
      router.push('/ban')
    }
  }, [listBan,ip,router]);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return(
    <>
    <NavBar/>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-WYTYXQXVK6`} />
    <Script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-WYTYXQXVK6', {
                    page_path: window.location.pathname,
                    });
                `}
    </Script>
    <Component {...pageProps} />
    <ToastContainer />
    {isLoading && <div className="nprogress-custom-parent"><div className="nprogress-custom-bar"/></div>}
    <Footer/>

    </>
  ) 
}
