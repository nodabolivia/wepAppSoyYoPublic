import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existUserByPublicId,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import style from "../styles/publicProfileView2.module.css";
import styleFooter from "../styles/footer.module.css";
import Loading from "../components/loading";
import "../styles/theme.css";
import QrCodeGr from "../components/QrCodeGr";
import { Row } from "react-bootstrap";
import { MdQrCode2 } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

import logo from "../assets/img/logo-mt-corp.svg";
import { ListSecondaryLink } from "../components/listSecondaryLink";
import { ListPrimaryLink } from "../components/listPrimaryLink";
import { Contact } from "../components/contact";

export default function PublicProfileView() {
  const params = useParams(); //permite tener info de las URL, es decir las variables que se pasaron por la direccion del enlace
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [career, setCareer] = useState("");

  const [linkList, setLinkList] = useState([]);
  const userRef = useRef(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  const [theme, setTheme] = useState("default");
  const [bg, setBg] = useState("first");
  const [bgHover, setBgHover] = useState("firstHover");
  const qrComponent = QrCodeGr(params.publicId + "");

  useEffect(() => {
    // setState(1);
    getProfile();
  }, [params]);

  async function getProfile() {
    const publicId = params.publicId;
    try {
      const userUid = await existUserByPublicId(publicId);
      if (userUid) {
        try {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setUsername(userInfo.profileInfo.username);
          setDisplayName(userInfo.profileInfo.displayName);
          setCareer(userInfo.profileInfo.career);
          console.log(userInfo.profileInfo.theme);
          setTheme(userInfo.profileInfo.theme);
          console.log(theme);
          handleTheme(userInfo.profileInfo.theme);
          setLinkList(userInfo.linksInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          userRef.current = userInfo.profileInfo;
          setUrl(url);
          // setState(8);
        } catch (error) {
          console.log(error);
        }
      } else {
        setState(7);
      }
    } catch (error) {}
  }

  function handleOnLoadImage() {
    setState(8);
  }

  function handleTheme(theme) {
    switch (theme) {
      case "default": {
        setBg("first");
        setBgHover("firstHover");
        break;
      }
      case "dark": {
        setBg("second");
        setBgHover("secondHover");
        break;
      }
      case "colors": {
        setBg("third");
        setBgHover("thirdHover");
        break;
      }

      default: {
        setBg("first");
        setBgHover("firstHover");
        break;
      }
    }
  }

  function getLinksListByCategory(category) {
    const links = linkList.filter((link) => link.category === category);
    return links;
  }

  if (state === 7) {
    return <div>El usuario no existe</div>;
  }
  // if (state === 1) {
  //   return <Loading></Loading>;
  // }
  return (
    <div className={style.backContainer}>
      <div className={`${style.backRectangle} ${bg}`}></div>
      <Row className={style.profileContainer}>
        <div className={style.imageContainer}>
          <img className={style.imageAvatar} src={url} alt={displayName} />
        </div>
        <div className={style.afterImageContainer}>
          <div className={style.infoContainer}>
            <span className={style.infoDisplayName}>{displayName}</span>
            <div className={style.infoCareer}>{career}</div>
          </div>
          <div className={style.othersContainer}>
            {/* <div className={style.qrContainer}> */}
            {/* <a className={style.qrContainer}  href={qrComponent} download="QRCode">
                <MdQrCode2 className={style.qrIcon} />
                <br />
                Modo Offline
              </a> */}
            <div className={style.qrContainer}>
              <a href={qrComponent} download="QRCode">
                <MdQrCode2 className={style.qrIcon} />
                <br />
                Modo Offline
              </a>
            </div>{" "}
            <div>
              <Contact
                url={url}
                style={`${style.saveContainer} ${bg} ${bgHover}`}
              ></Contact>
            </div>
            <div className={style.shareContainer}>
              <RiShareForwardLine className={style.shareIcon} />
              <br />
              Compartir en RRSS
            </div>
          </div>
          <div className={style.primaryLinksContainer}>
            <ListPrimaryLink
              linkList={getLinksListByCategory("primary")}
            ></ListPrimaryLink>
          </div>
          <div className={style.secondaryLinksOutsideContainer}>
            <div className={style.secondaryLinksContainer}>
              <div className={style.secondaryLinksSort}>
                <div className={style.secondaryLinkRow}>
                  <ListSecondaryLink
                    bg={bg}
                    bgHover={bgHover}
                    linkList={getLinksListByCategory("secondary")}
                  ></ListSecondaryLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <div className={styleFooter.footerContainer}>
        <a
          rel="noreferrer"
          target="_blank"
          className={styleFooter.footerLinkContainer}
          href="https://mtcorplatam.com/"
        >
          {""}
          <img
            src={logo}
            alt="MTCorp logotipo"
            className={styleFooter.footerLinkImg}
          />
        </a>
      </div>
    </div>
  );
}
