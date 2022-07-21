import style from "../styles/publicProfileView.module.css";
import VCard from "vcard-creator";


export const Contact = ({
  name,
  email,
  phone,
  address,
  career,
  website,
  url,
  style
}) => {

async function createContact(){
  var myVCard = new VCard();
  let image64 = await getBase64Image(url)

  if(name !== "" || name !== null || name!== undefined){
    myVCard.addName(name);
  }
  if(email !== "" || email !== null || email!== undefined){
    myVCard.addEmail(email,'PREF;WORK');
  }
  if(phone !== "" || phone !== null || phone!== undefined){
    myVCard.addPhoneNumber(phone,'WORK');
  }
  if(address !== "" || address !== null || address!== undefined){
    myVCard.addAddress(address);
  }
  if(career !== "" || career !== null || career!== undefined){
    myVCard.addJobtitle(career);
  }
  if(website !== "" || website !== null || website!== undefined){
    myVCard.addURL(website);
  }
  if(image64 !== "" || image64 !== null || image64!== undefined){
    myVCard.addPhoto(image64);
  }

  const element = document.createElement("a");
  const file = new Blob([myVCard.toString()], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = "contacto-"+name.replace(' ','-')+".vcf";
  document.body.appendChild(element);
  element.click();
  
}


async function getBase64Image(urlImage) {
  var img = new Image();
  img.crossOrigin="anonymous";
  img.src = urlImage;
  return new Promise((resolve)=>{
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve( dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    }
  });
}

  return (
    <div
    className={style}
      onClick={function () {
        createContact();
      }}
    >
      <span>Guardar Contacto</span>
    </div>
  );
};