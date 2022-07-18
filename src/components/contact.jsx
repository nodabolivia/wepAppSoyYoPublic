import VCard from "vcard-creator";


export const Contact = ({
  name,
  email,
  phone,
  address,
  company,
  website,
  url,
  style
}) => {

async function createContact(){
  var myVCard = new VCard();
  name = "Matheus Loerte"
  email="matheus.loerte@mtcorplatam.com"
  phone = "+55 13 99730-7397"
  address = "Avenida Irala, 462-Santa Cruz de La Sierra-Bolivia"
  company = "Gerente de Proyectos"
  website = "http://taggo.one/matheusloerte"

  console.log(url)
  let image64 = await getBase64Image(url)
  console.log(image64)

  myVCard.addName(name);
  myVCard.addEmail(email,'PREF;WORK');
  myVCard.addPhoneNumber(phone,'PREF;WORK');
  myVCard.addAddress(';;'.concat(address));
  myVCard.addCompany(company);
  myVCard.addURL(website);
  myVCard.addPhoto(image64);


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
    <button
      rel="nofollow"
      target="_top"
      className={style}
      onClick={function () {
        createContact();
      }}
    >
      <span>Guardar Contacto</span>
    </button>
  );
};