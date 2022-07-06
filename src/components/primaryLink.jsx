import phone from "../assets/img/call-icon.png";
import mail from "../assets/img/mail-icon.png";
import map from "../assets/img/map-icon.png";
import whatsapp from "../assets/img/whatsapp-icon.png";
import style from "../styles/linkPrimary.module.css";

export const PrimaryLink = ({ socialMedia, title, url }) => {
  function handleSocialMediaIcon() {
    switch (socialMedia) {
      case "phone":
        return phone;
      case "whatsapp":
        return whatsapp;
      case "email":
        return mail;
      case "maps":
        return map;
      default:
        break;
    }
  }
  function handleClickLink() {
    // if (emailAddress!== "") {
    //   const newURL = linkEmail(emailAddress, emailSubject, emailBody);
    //   const newLink = {
    //     id: uuidv4(),
    //     title: "Email",
    //     socialmedia: "email",
    //     category: "primary",
    //     url: newURL,
    //     uid: currentUser.uid,
    //   };
    //   const res = insertNewLink(newLink);
    //   newLink.docId = res.id;
    //   return newLink.docId;
    // }
  }
  return (
    <>
      <a
      onClick={handleClickLink()}
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
