import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Banner() {
  const [key,setKey] = useState("")
  const  router =   useRouter()
  const handleKey = () => {
      if(key === process.env.NEXT_PUBLIC_KEY){
        localStorage.setItem("UploadLinked",true)
        router.push("/home")
        toast.success('Kích hoạt thành công!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      else toast.error('Mã không đúng!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Để thêm ảnh bạn hãy liên hệ với tôi để nhận mã kích hoạt để tránh spam, xin lỗi vì sự bất tiện này!</p>
          <Link target="_blank" href="https://www.facebook.com/lnkhoa1205" className="btn btn-primary">Liện hệ tôi</Link>
          <div className="border-2 mt-4 border-slate-600 flex justify-between pl-4 rounded-lg items-center">
            <b>Key</b>
            <input onChange={(e) => setKey(e.target.value)} className="h-[40px] flex-1 ml-2 px-4 outline-none" type="text" placeholder="Nhập mã kích hoạt" value={key}/>
            <button onClick={handleKey} className="bg-green-600 h-[40px] rounded-r-lg hover:bg-green-900 duration-500 px-4 text-white font-semibold">Kích hoạt</button>
          </div>
        </div>
      </div>
    </div>
  );
}
