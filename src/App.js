import "./style/Colors.css";
import "./style/App.css";
import Image from "./components/Image";

// Generate an object; eventually this will come from the database
function hiddenObject(id, label, x, y) {
  return { id, label, x, y };
}

function App() {
  const data = {
    src: "images/xzom3ygdf2ua1.png",
    alt: "A scene containing many buildings, vehicles, monsters, and events",
    search: [
      hiddenObject("aaa", "Stick em' up!", 562, 950),
      hiddenObject("aab", "Octopus", 1740, 1194),
      hiddenObject("aac", "Viking", 394, 1187),
    ],
  };

  return (
    <>
      <header>
        <h1>Welcome</h1>
        <img src="./logo192.png" alt="blah" />
      </header>

      <main>
        {/* 
        Octapus
        Viking
        Unlikely Robbery

        Image By SRHillustration
        https://www.reddit.com/r/wimmelbilder/comments/12n75ye/midnight_metropolis_digital_by_me/
        https://www.etsy.com/shop/SRHillustration 
        https://www.instagram.com/srh_illustration/
        */}

        {/* Pull this from the database */}

        <Image data={data} />
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}

export default App;
