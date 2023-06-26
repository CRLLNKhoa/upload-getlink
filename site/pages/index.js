import Link from "next/link";
import MyHead from "../components/MyHead";
import FileUpload from "@/components/Fileupload";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
      <MyHead
        title="Code by Lương Khoa"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/354601920_3519700628267143_8220195181155688808_n.jpg?_nc_cat=111&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FvDvGxKoaZAAX91uU5J&_nc_ht=scontent.fvca2-1.fna&oh=00_AfAzOrmKgziLOOOUkHQzkPkrVKhqQW7uwjoNyS5DLUT-Wg&oe=649F1167"
        url="https://upload-getlink-crllnkhoa.vercel.app/"
      />
      <main className="w-full min-h-screen flex flex-col items-center">
        <Banner />
      </main>
    </>
  );
}
