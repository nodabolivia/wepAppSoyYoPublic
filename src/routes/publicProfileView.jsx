import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existUserByPublicId,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import style from "../styles/publicProfileView2.module.css";
import styleLinks from "../styles/publicLink.module.css";
import Loading from "../components/loading";
import PublicLink from "../components/publicLink";
import { Row } from "react-bootstrap";
import { MdQrCode2 } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

import logo from '../assets/img/logo-mt-corp.svg';
import { SecondaryLink } from "../components/secondaryLink";
import { PrimaryLink } from "../components/primaryLink";

export default function PublicProfileView() {
  const params = useParams(); //permite tener info de las URL, es decir las variables que se pasaron por la direccion del enlace
  const [profile, setProfile] = useState({});
  const [linkList, setLinkList] = useState([]);
  const userRef = useRef(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

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
          setProfile(userInfo.profileInfo);
          setLinkList(userInfo.linksInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          userRef.current = userInfo.profileInfo;

          setUrl(url);
          console.log(profile);
          console.log(url);
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
    console.log("loaded");
  }

  if (state === 7) {
    return <div>El usuario no existe</div>;
  }
  // if (state === 1) {
  //   return <Loading></Loading>;
  // }
  return (
    <div className={style.backContainer}>
      <div className={style.backRectangle}></div>
      <Row className={style.profileContainer}>
        <div className={style.imageContainer}>
          <img
            className={style.imageAvatar}
            src={url}
            // alt={profile?.profileInfo.displayName}
            alt={""}
            onLoad={handleOnLoadImage}
          />
        </div>
        <div className={style.afterImageContainer}>
          <div className={style.infoContainer}>
            <span className={style.infoDisplayName}>Carolina Cladera</span>
            <div className={style.infoCareer}>Programadora</div>
          </div>
          <div className={style.othersContainer}>
            <div className={style.qrContainer}>
              <MdQrCode2 className={style.qrIcon} />
              <br />
              Modo Offline
            </div>
            <div>
              <a
                rel="nofollow"
                href="https://taggo.one/EIIYS7SIF/vcard.vcf"
                target="_top"
                className={style.saveContainer}
              >
                <span>Guardar Contacto</span>
              </a>
            </div>
            <div className={style.shareContainer}>
              <RiShareForwardLine className={style.shareIcon} />
              <br />
              Compartir en RRSS
            </div>
          </div>
          <div className={style.primaryLinksContainer}>
            <PrimaryLink
            url="https://taggo.one/elianacalderon#"
            socialMedia="call"
            title="Llamar"          
            ></PrimaryLink>
            <PrimaryLink
            url="https://taggo.one/elianacalderon#"
            socialMedia="whatsapp"
            title="Whatsapp"           
            ></PrimaryLink>
            <PrimaryLink
            url="https://taggo.one/elianacalderon#"
            socialMedia="mail"
            title="Email"          
            ></PrimaryLink>
            <PrimaryLink
            url="https://taggo.one/elianacalderon#"
            socialMedia="map"
            title="Mapa"          
            ></PrimaryLink>
          </div>
          <div className={style.secondaryLinksOutsideContainer}>
            <div className={style.secondaryLinksContainer}>
              <div className={style.secondaryLinksSort}>
                <div className={style.secondaryLinkRow}>
                  <SecondaryLink
                    socialMedia="linkedin"
                    title="LinkedIn"
                    url="https://www.linkedin.com"
                  ></SecondaryLink>
                  {/* <SecondaryLink
                    socialMedia="instagram"
                    title="Instagram"
                    url="https://www.instagram.com"
                  ></SecondaryLink>
                  <SecondaryLink
                    socialMedia="facebook"
                    title="Facebook"
                    url="https://www.facebook.com"
                  ></SecondaryLink>
                  <SecondaryLink
                    socialMedia="tiktok"
                    title="TikTok"
                    url="https://www.linkedin.com"
                  ></SecondaryLink>
                  <SecondaryLink
                    socialMedia="twitch"
                    title="Twitch"
                    url="https://www.linkedin.com"
                  ></SecondaryLink>
                  <SecondaryLink
                    socialMedia="twitter"
                    title="Twitter"
                    url="https://www.linkedin.com"
                  ></SecondaryLink> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <div className={style.footerContainer}>
        <a
           rel="noreferrer"
           target="_blank"
           className={style.footerLinkContainer}
           href="https://mtcorplatam.com/"
           >
             {""}
            <img src={logo} alt="MTCorp logotipo" className={style.footerLinkImg}/>
        </a>

      </div>
    </div>
  );
}
