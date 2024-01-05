const Mailgen = require("mailgen");
const { app_name, client_url } = require("../config/config");
const otpTemplate = (name, text, link, instructions) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: app_name,
      link: client_url,
    },
  });
  const email = {
    body: {
      name: name,
      intro: `Welcome to ${app_name} `,
      action: {
        instructions: instructions,
        button: {
          color: "#22BC66", // Optional action button color
          text: text,
          link: link
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  return mailGenerator.generate(email);
};
module.exports = otpTemplate;
