import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebaseconfig";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { toast } from "react-toastify";
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default function FileUpload() {
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setfilename] = useState("");
  const [percentage, setpercentage] = useState(0);
  const [isError, setisError] = useState(false);
  const [file, setfile] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const [title, settitle] = useState("");
  const [uploader, setuploader] = useState("");
  const [keyword, setkeyword] = useState([]);
  const [isLoadingSave, setisLoadingSave] = useState(false);

  useEffect(() => {
    if (file) {
      setfilename(file.name);
    }
  }, [file]);

  const handleInputFile = (e) => {
    let fileData = e.target.files[0];
    setfile(fileData);
  };

  const hanleImageUpload = (e) => {
    e.preventDefault();
    setisLoading(true);
    const storageRef = firebase.storage().ref();
    const folderName = "myImages";
    const fileName = filename;
    setfilename(fileName);
    const fileRef = storageRef.child(`${folderName}/${fileName}`);
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setpercentage(Math.round(progress));
      },
      (error) => {
        if (error) {
          setisError(true);
        }
      },
      () => {
        storage
          .ref("myImages")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
          });
        setisLoading(false);
        console.log("Upload Thành công!");
      }
    );
  };

  const handleGetLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`copy`);
    toast.success("Copy success!");
  };

  const saveImage = (e) => {
    setisLoadingSave(true)
    e.preventDefault()
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/save`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        links: imageUrl,
        title: title,
        uploader: uploader,
        keyword: keyword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Lỗi xảy ra khi lưu thông tin!");
        }
        toast.success("Cập nhật thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        settitle("")
        setkeyword("")
        setuploader("")
        setisLoadingSave(false)
        setImageUrl("")
        setfilename()
      })
      .catch((err) => {
        console.log(err.message);
        setisLoadingSave(false)
      });
  };

  return (
    <div className="flex justify-center items-center gap-3 flex-col">
      {imageUrl && (
        <div className="w-full flex justify-center items-center h-[100px]">
          <img
            className="max-w-[60%] max-h-full rounded-lg"
            src={imageUrl}
            alt="images"
          />
        </div>
      )}
      <input
        type="file"
        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        accept="image/*"
        onChange={handleInputFile}
      />
      <div className="flex gap-2 items-center">
        <progress
          className="progress w-56"
          value={percentage}
          max="100"
        ></progress>
        <span>{percentage}%</span>
      </div>
      {filename && (
        <button disabled={isLoading} onClick={hanleImageUpload} className="btn">
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span> Đợt 1 chút, bộ
              gắp lắm à!
            </>
          ) : (
            "Upload"
          )}
        </button>
      )}
      {imageUrl && (
        <div className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-[11px]">Upload thành công! Bạn có thể lưu lại ở dưới.</span>
          <div>
            <button onClick={handleGetLink} className="btn btn-sm btn-primary">
              Get link
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex gap-2">
        <b>Tên ảnh:</b>
        <input onChange={(e) => settitle(e.target.value)} value={title} className="flex-1 outline-none" type="text" placeholder="Nhập tiêu đề ảnh" />
      </div>
      <div className="w-full flex gap-2">
        <b>Tên người đăng:</b>
        <input onChange={(e) => setuploader(e.target.value)} value={uploader} className="flex-1 outline-none" type="text" placeholder="Nhập tên người upload" />
      </div>
      <div className="w-full flex gap-2">
        <b>Keyword:</b>
        <input onChange={(e) => setkeyword(e.target.value)} value={keyword} className="flex-1 outline-none" type="text" placeholder="Từ khóa cách nhau khoảng trắng" />
      </div>
      <div>
        <button disabled={isLoadingSave} className="bg-indigo-700 py-1 px-12 hover:bg-indigo-600 duration-500 text-slate-300 rounded-lg font-medium" onClick={saveImage}>
        {isLoadingSave ? (
            <>
              <span className="loading loading-spinner"></span> Đợt 1 chút, bộ
              gắp lắm à!
            </>
          ) : (
            "Lưu vào website"
          )}
        </button>
      </div>
    </div>
  );
}
