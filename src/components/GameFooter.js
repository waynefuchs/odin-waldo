import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "../style/GameFooter.css";

function GameFooter({ credit }) {
  const author = credit?.author ? credit.author : "unknown";
  const title = credit?.title ? credit.title : "untitled";
  const socialIcons = {
    etsy: <FontAwesomeIcon icon={icon({ name: "etsy", style: "brands" })} />,
    instagram: (
      <FontAwesomeIcon icon={icon({ name: "instagram", style: "brands" })} />
    ),
    reddit: (
      <FontAwesomeIcon icon={icon({ name: "reddit", style: "brands" })} />
    ),
  };

  function getSocial(social) {
    if (!credit) return null;
    if (!credit[social]) return null;

    return (
      <a className="socials" key={credit[social]} href={credit[social]}>
        {socialIcons[social]}
      </a>
    );
  }

  function getSocials() {
    const socials = ["etsy", "instagram", "reddit"];
    // icon({ name: "user", family: "classic", style: "solid" });
    return (
      <>
        {socials
          .map((social) => getSocial(social))
          .filter((ele) => ele != null)}
      </>
    );
  }

  return (
    <footer>
      <p>{author}</p>
      <p>{title}</p>
      <p className="socials">{getSocials()}</p>
    </footer>
  );
}

export default GameFooter;
