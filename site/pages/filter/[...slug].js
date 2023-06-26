import CardImage from "@/components/CardImage";
import MyHead from "@/components/MyHead";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  // Rest of `getServerSideProps` code
  return {
    props: {
      query: slug,
    },
  };
}

export default function Filter({query}) {
  const [limit, setlimit] = useState(20);
  const [data, setData] = useState([]);
  const [keyword, setkeyword] = useState([]);
  const [uploader, setuploader] = useState([]);
  const [found,setfound] = useState(true)
  const [totalImgs,setTotalImgs] = useState(0)
  const [isLoading, setisLoading] = useState(false)

  const router = useRouter()

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

  useEffect(() => {
    setlimit(20)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/filter?limit=${limit}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        type: query[0],
        filter: query[1]
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Lỗi xảy ra khi lưu thông tin!");
        }
        setData(data.data)
        setTotalImgs(data.totalImgs)
        setfound(false)
      })
       
  }, [router]);

  const loadMore = () => {
    setlimit(limit + 20)
    setisLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/filter?limit=${limit}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        type: query[0],
        filter: query[1]
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Lỗi xảy ra khi lưu thông tin!");
        }
        setData(data.data)
        setTotalImgs(data.totalImgs)
        setisLoading(false)
      })
  };

  if(found){
    return(
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    )
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
        <div className="w-full grid grid-cols-4 gap-4 p-4">
          <div className="flex col-span-4 pr-2 lg:col-span-1 flex-col border-r-2 mb-4 lg:mb-0 lg:min-h-screen">
            <h1 className="font-bold">Keyword:</h1>
            <div className="flex flex-wrap mt-2 gap-4">
              {keyword?.map((item) => (
                <Link
                  key={item}
                  className={`border ${item===query[1] && "bg-sky-600 text-white"} hover:bg-sky-600 hover:text-white hover:border-transparent duration-500 border-black px-4 rounded-lg`}
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
                  className={`border ${item===query[1] && "bg-sky-600 text-white"} hover:bg-sky-600 hover:text-white hover:border-transparent duration-500 border-black px-4 rounded-lg`}
                  href={`/filter/uploader/${item}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3 flex flex-col">
            <div className="flex flex-wrap gap-4 justify-start">
              {data?.map((item) => (
                <div key={item._id} className="lg:w-[23%]">
                  <CardImage
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
                  {isLoading ? "Đang tải thêm" : "Xem thêm"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
