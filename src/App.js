import "./App.css";
import Image from "./components/Image";

function App() {
  return (
    <>
      <header>
        <h1>Welcome</h1>
      </header>

      <main>
        <p>main content</p>

        {/* 

        Octapus
        Viking
        Unlikely Robbery

        Image By SRHillustration
        https://www.reddit.com/r/wimmelbilder/comments/12n75ye/midnight_metropolis_digital_by_me/
        https://www.etsy.com/shop/SRHillustration 
        https://www.instagram.com/srh_illustration/
        */}

        <Image src="images/xzom3ygdf2ua1.png" alt="hmm" />
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}

export default App;
