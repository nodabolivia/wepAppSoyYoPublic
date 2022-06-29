import call from "../assets/img/call-icon.png";
import mail from "../assets/img/mail-icon.png";
import map from "../assets/img/map-icon.png";
import whatsapp from "../assets/img/whatsapp-icon.png";
import style from "../styles/linkPrimary.module.css";

export const PrimaryLink = ({ socialMedia, title, url }) => {
  function handleSocialMediaIcon() {
    switch (socialMedia) {
      case "call":
        return call;
      case "whatsapp":
        return whatsapp;
      case "mail":
        return mail;
      case "map":
        return map;
      default:
        break;
    }
  }

  return (
    <>
      <a
        rel="noreferrer"
        target="_blank"
        className={style.primaryLink}
        href={url}
      >
        <img
          src={handleSocialMediaIcon()}
          className={style.primaryLinksIcon}
          alt={socialMedia}
        />{" "}
        <br />
        {title}
      </a>
    </>
  );
};
