function Footer() {
  const links = [
    {
      name: "LinkedIn.",
      // TODO: replace with your actual LinkedIn URL
      href: "https://linkedin.com/in/ibrahim-naseef",
    },
    {
      name: "Github.",
      href: "https://github.com/ibrahim-naseef",
    },
    {
      name: "Email.",
      href: "mailto:Ibrahimnaseef19@gmail.com",
    },
    {
      name: "llms.txt",
      href: "/llms.txt",
    },
  ];

  return (
    <div className="footer">
      <div className="links">
        {links.map((link, i) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={`footer-link-${i}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Footer;
