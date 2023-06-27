import React, { useEffect, useState } from "react";

export default function Admin() {
  const [limit, setlimit] = useState(10);
  const [list, setData] = useState([]);
  const [found, setfound] = useState(true);
  const [totalImgs, setTotalImgs] = useState(0);
  const [isLoading, setisLoading] = useState(false);

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

  const arlet = (id) => {
    if (confirm("Bạn có muốn xóa không!")) {
      handleDel(id);
    } else {
      console.log("No");
    }
  };

  const handleDel = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/del/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Kết nối server thất bại!");
        }

        const deleting = list.filter(function (e) {
          return e._id !== data.id;
        });
        setData(deleting);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleShow = (id, action) => {
    setfound(true)
    if (action === "show") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/update/${id}/?action=show`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 400) {
            return toast.error("Kết nối server thất bại!");
          }
          const index = list.findIndex(item => item._id === data.id)
          const newItem = {
            ...list[index],status: true
          }
          let array = list
          array[index] = newItem 
          setData(array)
          setfound(false)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (action === "hidden") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/update/${id}/?action=hidden`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 400) {
            return toast.error("Kết nối server thất bại!");
          }
          const index = list.findIndex(item => item._id === data.id)
          const newItem = {
            ...list[index],status: false
          }
          let array = list
          array[index] = newItem 
          setData(array)
          setfound(false)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  if(found){
    return <div className="h-screen w-full flex justify-center items-center">
    <span className="loading loading-ring loading-lg"></span>
  </div>
  }

  return (
    <>
      <div className="min-h-screen p-4">
        <h1 className="font-bold">Quản lý ảnh: </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>STT</th>
                <th>Images</th>
                <th>Uploader</th>
                <th>IP</th>
                <th>Time upload</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr className="hover cursor-pointer">
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="w-14 h-14 rounded-lg"
                      src={item.links}
                      alt=""
                    />
                  </td>
                  <td>{item.uploader}</td>
                  <td>{item.ip}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <div className="flex gap-4">
                      {item.status === false ? (
                        <button
                          onClick={() => handleShow(item._id,"show")}
                          className="bg-orange-600 p-2 rounded-lg"
                        >
                          <img className="w-4" src="/svg/hidden.svg" alt="" />
                        </button>
                      ) : (
                        <button  onClick={() => handleShow(item._id,"hidden")} className="bg-green-600 p-2 rounded-lg">
                          <img className="w-4" src="/svg/view.svg" alt="" />
                        </button>
                      )}

                      <button
                        onClick={() => arlet(item._id)}
                        className="bg-red-600 p-2 rounded-lg"
                      >
                        <img className="w-4" src="/svg/del.svg" alt="" />
                      </button>

                      <button className="bg-red-600 p-2 rounded-lg">
                        <img className="w-4" src="/svg/ban.svg" alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
}
