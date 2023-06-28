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
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://fapxy.info/wp-content/uploads/2022/04/1650591567_106_200-anh-bia-dep-xin-xo-cho-Facebook-YouTube-Zalo.jpg"
              className="w-full h-[340px]"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://mgvinhhai.edu.vn/wp-content/uploads/Thuong-thuc-anh-bia-dep-de-thuong-nhat-lam-anh.jpg"
              className="w-full h-[340px]"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/files/anh-bia-facebook-dep-yody-vn-1.jpg?v=1684576893424"
              className="w-full h-[340px]"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://addo.vn/wp-content/uploads/2021/10/anh-bia-anh-nen-facebook-dep-57-1024x379.jpg"
              className="w-full h-[340px]"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>

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
          <div className="col-span-4 lg:col-span-4 flex flex-col">
            <div className="flex flex-wrap gap-4 justify-start">
              {data
                ?.filter((obj) => obj.status === true)
                .map((item, index) => (
                  <div key={item._id} className="lg:w-[19%] w-full">
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
