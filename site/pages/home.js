import CardImage from "@/components/CardImage";
import FileUpload from "@/components/Fileupload";
import MyHead from "@/components/MyHead";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [check, setCheck] = useState(false);
  const [limit, setlimit] = useState(20);
  const [data, setData] = useState([]);
  const [keyword, setkeyword] = useState([]);
  const [uploader, setuploader] = useState([]);
  const [found, setfound] = useState(true);
  const [totalImgs, setTotalImgs] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("UploadLinked")) {
      setCheck(true);
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load?limit=${limit}`, {
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
        setData(data.data);
        setTotalImgs(data.totalImgs);
        setfound(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/uploader`, {
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
        setuploader(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/keyword`, {
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
        setkeyword(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const loadMore = () => {
    setlimit(limit + 10);
  };

  useEffect(() => {
    setisLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load?limit=${limit}`, {
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
        setData(data.data);
        setTotalImgs(data.totalImgs);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [limit]);

  if (found) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <MyHead
        title="Upload - GetLink"
        description="Website này code để tự tao xài ok!"
        image="https://user-images.githubusercontent.com/107914230/248885762-7c35eb99-c0d6-4e75-8a9b-6c7196f92711.png"
        url="https://upload-getlink-crllnkhoa.vercel.app/"
      />
      <main className="w-full min-h-screen flex flex-col items-center">
        <div className="w-full items-center flex justify-end px-8 py-4">
          {check ? (
            <button
              className="bg-indigo-700 py-2 px-4 text-white font-bold rounded-lg"
              onClick={() => window.my_modal_1.showModal()}
            >
              Thêm ảnh
            </button>
          ) : (
            <Link
              href="/"
              className="bg-green-700 py-2 px-4 text-white font-bold rounded-lg"
            >
              Kích hoạt để upload ảnh
            </Link>
          )}
        </div>
        <div className="w-full grid grid-cols-4 gap-4 p-4">
          <div className="flex col-span-4 pr-2 lg:col-span-1 flex-col border-r-2 mb-4 lg:mb-0 lg:min-h-screen">
            <h1 className="font-bold">Keyword:</h1>
            <div className="flex flex-wrap mt-2 gap-4">
              {keyword?.map((item) => (
                <Link
                  key={item}
                  className="border hover:bg-sky-600 hover:text-white hover:border-transparent duration-500 border-black px-4 rounded-lg"
                  href={`/filter/keyword/${item}`}
                >
                  {item}
                </Link>
              ))}
            </div>
            <h1 className="font-bold mt-12">Người đăng:</h1>
            <div className="flex flex-wrap mt-2 gap-4">
              {uploader?.map((item) => (
                <Link
                  key={item}
                  className="border hover:bg-sky-600 hover:text-white hover:border-transparent duration-500 border-black px-4 rounded-lg"
                  href={`/filter/uploader/${item}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3 flex flex-col">
            <div className="flex flex-wrap gap-4 justify-start">
              {data?.filter(obj => obj.status === true).map((item,index) => (
                <div key={item._id} className="lg:w-[23%]">
                  <CardImage
                    index={index + 100}
                    title={item.title}
                    img={item.links}
                    keyword={item.keyword}
                    uploader={item.uploader}
                  />
                </div>
              ))}
            </div>
            {totalImgs >= limit && (
              <div className="w-full flex justify-center my-12">
                <button
                  disabled={isLoading}
                  onClick={loadMore}
                  className="bg-green-600 px-8 rounded-lg py-1 text-white font-semibold"
                >
                  {isLoading ? "Đang tải thêm" : "Tải thêm"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24"></div>
      </main>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <div className="py-4">
            <FileUpload />
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
