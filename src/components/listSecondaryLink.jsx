import style from "../styles/linkPrimary.module.css";
import { SecondaryLink } from "./secondaryLink";

export const ListSecondaryLink = ({ linkList }) => {
  return (
    <>
      {linkList.length > 0 ? (
        <>
          {linkList.map((link) => (
            <SecondaryLink
              socialMedia={link.socialmedia}
              title={link.title}
              url={link.url}
            ></SecondaryLink>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
};
