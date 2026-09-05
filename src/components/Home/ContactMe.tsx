import { useState } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import CommonButton from "../Shared/CommonButton";
import "./contact-me.css";

// 1. Go to https://web3forms.com/ and enter your email to generate a free
//    Access Key (no signup/login required, no backend needed).
// 2. Paste that key below. Every submission on the live site will then be
//    emailed straight to the inbox you registered with Web3Forms.
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

type Status = "idle" | "sending" | "success" | "error";

function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New portfolio message from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="contact-me-section" id="contact">
      <h1 className="heading" data-color-inverted={"true"}>
        Contact Me
      </h1>
      <p className="contact-desc">
        Have a role, a project, or just want to say hi? Send me a message and
        it'll land straight in my inbox.
      </p>

      {status === "success" ? (
        <div className="contact-success">
          <FiCheckCircle size={40} />
          <p>Thanks! Your message has been sent - I'll get back to you soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          {status === "error" && (
            <p className="contact-error">
              Something went wrong - please try again, or email me directly at{" "}
              <a href="mailto:Ibrahimnaseef19@gmail.com">
                Ibrahimnaseef19@gmail.com
              </a>
              .
            </p>
          )}
          <CommonButton
            text={status === "sending" ? "Sending..." : "Send Message"}
            Icon={<FiSend />}
            iconPosition="right"
            disabled={status === "sending"}
          />
        </form>
      )}
    </div>
  );
}

export default ContactMe;
