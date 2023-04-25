import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "../style/GameFooter.css";

function GameFooter(props) {
  const author = props?.credit?.author ? props.credit.author : "unknown";
  const title = props?.credit?.title ? props.credit.title : "untitled";
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
    if (!props.credit) return null;
    if (!props.credit[social]) return null;

    return (
      <a
        className="socials"
        key={props.credit[social]}
        href={props.credit[social]}
      >
        {socialIcons[social]}
      </a>
    );
  }

  function getSocials() {
    const socials = ["reddit", "etsy", "instagram"];
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
