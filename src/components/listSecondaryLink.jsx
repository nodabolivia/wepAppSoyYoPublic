import { SecondaryLink } from "./secondaryLink";

export const ListSecondaryLink = ({ linkList, theme }) => {
  return (
    <>
      {linkList.length > 0 ? (
        <>
          {linkList.map((link) => (
            <SecondaryLink
              theme={theme}
              key={link.docId}
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
