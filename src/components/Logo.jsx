import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div>
        <div className="bg-#bb2700  w-[200px] h-[100px] flex items-center justify-center">
          <Image
            src="/logo_wine.svg"
            width={150}
            height={150}
            priority
            alt="wine"
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
