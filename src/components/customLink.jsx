/* eslint-disable jsx-a11y/alt-text */
import style from "../styles/linkSecondary.module.css";

export const CustomLink = ({ icon, website, url, theme }) => {
  return (
    <>
      <a
        rel="noreferrer"
        target="_blank"
        href={url}
        
        className={`${style.secondaryLink} ${theme}`}
      >
        <img className={style.icono} src={icon} />
        <span className={style.secondaryLinkSpan}>{website}</span>
      </a>
    </>
  );
};