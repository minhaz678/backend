const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
  let data = req.body;
  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    return res.json({ msg: "Please fill all the fields" });
  }

  let smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    post: 465,
    auth: {
      user: "mk16che011bsmrstu@gmail.com",
      pass: "16che011",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "mk16che011bsmrstu@gmail.com",
    subject: `message from ${data.name}`,
    html: `
    <h3>Informations</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Email: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    `
  };

  smtpTransporter.sendMail(mailOptions, (err) => {
    try {
      if (err) {
        return res.status(400).json({ msg: "Please fill all the fields" });
      }
      res.status(200).json({ msg: "Thank you for contact us!" });
    } catch (err) {
      if (err) {
        return res.status(500).json({ msg: "There is server error" });
      }
    }
  });
});

module.exports = router;
