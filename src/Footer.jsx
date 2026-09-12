const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3">
      <div
        className="
          relative
          mx-auto
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-2xl
          border
          border-white/50
          bg-white/60
          px-4
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          backdrop-blur-2xl
          backdrop-saturate-150
          sm:h-14
        "
      >
        {/* Glass highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />

        <p className="text-center text-xs font-medium text-gray-500 sm:text-sm">
          © {new Date().getFullYear()}
          <span className="mx-2 text-gray-300">•</span>
          Crafted by{" "}
          <span className="font-semibold text-gray-800 transition-colors hover:text-primary">
            dev.sanjeetsahu
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
