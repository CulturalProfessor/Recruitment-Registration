import Registrations from "../models/student.js";
import dotenv from "dotenv";
import Joi from "joi";
import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";
import fetch from "node-fetch";
dotenv.config();
const USERNAME = process.env.EMAIL_USERNAME;
const PASSWORD = process.env.EMAIL_PASSWORD;
const secretKey = process.env.VITE_SECRET_KEY;
import emailValidator from "deep-email-validator"
console.log(USERNAME)
console.log(PASSWORD)

const registrationSchema = Joi.object({
  Name: Joi.string().required(),
  Gender: Joi.string().required(),
  Branch: Joi.string().required(),
  Roll: Joi.string().required(),
  Email: Joi.string().email().required(),
  Hostel: Joi.string().required(),
  Year: Joi.string().required(),
  Phone: Joi.string().length(10).required(),
  Token: Joi.string().required(),
  Interest: Joi.array().items(Joi.string())
});

//function for sending  mail by nodemailer
async function sendEmailNodemailer(toMail,name,roll){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: USERNAME,
      pass: PASSWORD                 //always use app password
    }
  })
  await transporter.sendMail({
    from: USERNAME,
    to: toMail,
    subject: 'Registration of COMMIT',
    headers: {
      "X-My-Header": 'https://scontent-del2-1.xx.fbcdn.net/v/t39.30808-6/305819699_484347750365637_2455990691136540320_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pVAwo9W79ggAb7h7gEZ&_nc_ht=scontent-del2-1.xx&oh=00_AfAQUvBjQM7RfEC_mbDnIng-l3MYBPUO9l3MtU2S02IBPw&oe=6625C5B2'
  },
    html: `
    <font face="Google Sans" color="#444444" >
        <div style="font-size:110%">
            <p>Hi ${name}</p>
            <p>Congratulations on completing 50% of your event registration! To finish your registration, please pay the fee in person at one of our help desks. Show this email for confirmation of your online registration. </p>
            <br />
            <h1>${roll}</h1>
            <p>If you have any comments or questions dont hesitate to reach us at our help desk or through our ig <a href="https://www.instagram.com/team__oss?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="> team__oss </a></p>
  
            <p style="margin:0">Regards,</p>
            <p style="margin:0">TEAM OSSC</p>
        </div>
    </font>
    `
  })
}


//function for sending  mail by sendgrid
async function sendEmail(emailTypeFunction, toMail, fromMail, roll) {
  console.log("process.env.SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
  try {
    const emailMessage = getEmail();

    emailMessage.to = toMail;
    emailMessage.from = fromMail;

    await sendGridMail.send(emailMessage);
    return { message: `email sent successfully` };
  } catch (error) {
    console.log({ message: `Error in sending email`, error: error });
    return error;
  }
}

// check if email does exist or not
async function isEmailValid(email) {
  return emailValidator.validate(email)
}

function getEmail() {
  // return your html component here
  return {
    to: data.toMail,
    from: data.fromMail,
    subject: data.subject,
    html: `
  <font face="Google Sans" color="#444444" >
      <div style="font-size:110%">
          <p >Hi ${data.user.full_name}</p>
          <p> Congratulations on completing 50% of your event registration! To finish your registration, please pay the fee in person at one of our help desks. Show this email for confirmation of your online registration. </p>
          <br />
          <h1 style="text-align center">${roll}</h2>
          <p>If you have any comments or questions don’t hesitate to reach us at our help desk or through our ig <a href="https://www.instagram.com/team__oss?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="> team__oss </a></p>

      <p style="margin:0">Regards,</p>
      <p style="margin:0">TEAM OSSC</p>
  </div>
  </font>
  `,
  };
}
export const create = async (req, res) => {
  try {
    // console.log(req.body);
    const encryptedData = req.body.encryptedData;
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData);
    const decryptedDataJSON = JSON.parse(decryptedData);
    console.log(decryptedDataJSON);
    const { error } = registrationSchema.validate(decryptedDataJSON);
    console.log(error);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log(decryptedDataJSON);

    const { Name, Gender, Branch, Roll, Email, Phone, Year, Hostel, Token,Interest } =
      decryptedDataJSON;
    // const url = https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${Token};
    // const response = await fetch(url, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const oldUser = await Registrations.findOne({
      $or: [{ Email }, { Phone }, { Roll }],
    });

    if (oldUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      // if (data.success == true) {
        const {valid, reason, validators} = await isEmailValid(Email)
        console.log(valid)
        // console.log(data)
        if(valid){
          const result = await Registrations.create({
            Name,
            Gender,
            Branch,
            Roll,
            Email,
            Hostel,
            Year,
            Phone,
            Interest
          });
         console.log(result)
          sendEmailNodemailer(Email,Name,Roll)
  
          res.status(201).json("You have been registered successfully");
        }else{
          console.log("Success")
          res.status(404).json({message: "Email does not exist"})
        }
      // } else {
      //   res
      //     .status(421)
      //     .json({ message: "Please verify that you are not a robot" });
      // }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const { password } = req.body;
    if (password === PASSWORD) {
      const result = await Registrations.find();
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Please provide a valid password" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
