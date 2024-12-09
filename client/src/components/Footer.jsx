function Footer() {
  return (
    <footer className="h-6 fixed bottom-0 left-0 w-full bg-white z-50 pl-14">
      <div className="flex space-x-2 text-xs font-base ">
        <p>© 2024 Travel Nest, Inc.</p>
        <p className="hidden xs:block">·</p>
        <p className="hidden xs:block">Privacy</p>
        <p className="hidden xs:block">·</p>
        <p className="hidden xs:block">Terms</p>
        <p className="hidden xs:block">·</p>
        <p className="hidden xs:block">Sitemap</p>
        <p className="hidden sm:block">·</p>
        <p className="hidden sm:block">Company details</p>
      </div>
    </footer>
  );
}

export default Footer;
