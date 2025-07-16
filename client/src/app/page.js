import Image from "next/image";
import Navbar from "./components/home/navbar";
import About from "./components/home/about";
import Footer from "./components/home/footer";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <About/>
      <Footer/>
    </main>
  );
}
