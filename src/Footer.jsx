const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Made by dev.sanjeetsahu</p>
      </aside>
    </footer>
  );
};

export default Footer;
