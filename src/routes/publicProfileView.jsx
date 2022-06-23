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

export default function PublicProfileView() {
  const params = useParams(); //permite tener info de las URL, es decir las variables que se pasaron por la direccion del enlace
  const [profile, setProfile] = useState(null);
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
          // setProfile({ userInfo });
          setProfile(userInfo.profileInfo);
          setLinkList(userInfo.linksInfo);
          userRef.currentUser = userInfo.profileInfo;
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
          setState(8);
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
    // <div className={style.profileContainer}>
    //   <div className={style.profilePicture}>
    //     <img src={url} alt="Foto de perfil" width="100px" onLoad={handleOnLoadImage}/>

    //   </div>
    //   <h2>{profile?.profileInfo.username}</h2>
    //   <h3>{profile?.profileInfo.displayName}</h3>
    //   <div className={styleLinks.publicLinksContainer}>
    //     {profile?.linksInfo.map((link) => (
    //       <PublicLink key={link.docId} url={link.url} title={link.title}  />
    //     ))}
    //   </div>
    // </div>
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
              <MdQrCode2  className={style.qrIcon} />
              <br/>Modo Offline
            </div>
            <div>
            <a rel="nofollow" href="https://taggo.one/EIIYS7SIF/vcard.vcf" target="_top" 
            class={style.saveContainer} >
              <span>Guardar Contacto</span>
            </a>
            </div>
            <div className={style.shareContainer}>
              <RiShareForwardLine className={style.shareIcon}/>
              <br/>Compartir en RRSS
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}
