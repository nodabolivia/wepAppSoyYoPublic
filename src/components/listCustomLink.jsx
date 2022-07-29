import { CustomLink } from "./customLink";

export const ListCustomLink = ({ linkList, theme  }) => {
  return (
    <>
      {linkList.length > 0 ? (
        <>
          {linkList.map((link) => (
            <CustomLink
            theme={theme}
              key={link.docId}
              icon={link.icon}
              website={link.website}
              url={link.url}
            ></CustomLink>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
};