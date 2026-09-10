const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0 left-0 right-0 z-50 h-14">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Made by dev.sanjeetsahu</p>
      </aside>
    </footer>
  );
};

export default Footer;
