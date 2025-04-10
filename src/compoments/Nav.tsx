"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@public/logo-1.svg";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { fetchDataJson } from "@/lib/fetch";
import { Badge } from "@mui/material";
import { ProductType } from "@/types/type";



interface SearchResult {
  status: string;
  message: string;
  data: ProductType[];
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("user"));
    }
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("guest_cart") || '{"guest_cart": []}');
      const totalItems = cart.guest_cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setIsSearching(true);
      try {
        const results: SearchResult = await fetchDataJson(`products?search=${searchQuery}`);
        setSearchResults(results.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const logOut = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="container mx-auto max-w-7xl md:max-h-[80px] flex justify-between items-center gap-5 md:py-0 py-5 px-4">
      <Link href="/" passHref>
        <div className="flex-shrink-0">
          <Image
            src={Logo}
            alt="logo"
            width={120}
            height={120}
            className="sm:w-[100px] sm:h-[100px]"
          />
        </div>
      </Link>

      {/* Search Bar */}
      <div className="relative hidden lg:flex flex-grow items-center bg-[#F5F5F5] rounded-[8px] px-4 py-2">
        <SearchIcon className="text-[#A4A4A4] mr-2" />
        <input
          type="text"
          className="w-full bg-transparent outline-none"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 z-50">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.slice(0, 5).map((result) => (
                  <li
                    key={result.id}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link href={`/shop/${result.slug}`} passHref>
                      <div className="flex items-center gap-4">
                        <Image
                          src={"./sauce.svg"}
                          alt={result.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <span className="text-black">{result.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="hidden lg:flex text-[16px] gap-8 items-center">
        <Link href="/" passHref>
          <span className="text-black cursor-pointer">Home</span>
        </Link>
        <Link href="/login" passHref>
          <span className="text-[#A4A4A4] cursor-pointer">Login</span>
        </Link>
        {!isLoggedIn ? (
          <Link href="/register" passHref>
            <span className="text-[#A4A4A4] cursor-pointer">Register</span>
          </Link>
        ) : (
          <button className="cursor-pointer" onClick={logOut}>
            <LogoutIcon className="text-[#A4A4A4]" />
          </button>
        )}
        <Link href="/cart" passHref>
          <span className="text-[#A4A4A4] cursor-pointer">
            {cartCount > 0 ? (
              <Badge badgeContent={cartCount} color="success">
                <CartIcon className="text-[#A4A4A4]" />
              </Badge>
            ) : (
              <CartIcon className="text-[#A4A4A4]" />
            )}
          </span>
        </Link>
        <Link href="/profile" passHref>
          <span className="text-[#A4A4A4] cursor-pointer">
            <ProfileIcon className="text-[#A4A4A4]" />
          </span>
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden flex items-center">
        <MenuIcon
          className="text-[#A4A4A4] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 lg:hidden"
        >
          <Link href="/" passHref>
            <span className="text-black cursor-pointer">Home</span>
          </Link>
          <Link href="/login" passHref>
            <span className="text-[#A4A4A4] cursor-pointer">Login</span>
          </Link>
        {isLoggedIn ? (
          <button className="cursor-pointer" onClick={logOut}>
            <span className="text-[#A4A4A4] cursor-pointer">Logout</span>
          </button>
        ) : (
          <Link href="/register" passHref>
            <span className="text-[#A4A4A4] cursor-pointer">Register</span>
          </Link>
        )}
         
          <Link href="/cart" passHref>
            <span className="text-[#A4A4A4] cursor-pointer">Cart</span>
          </Link>
          <Link href="/profile" passHref>
            <span className="text-[#A4A4A4] cursor-pointer">Profile</span>
          </Link>
        </div>
      )}
    </nav>
  );
}