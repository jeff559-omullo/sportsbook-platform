"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Menu,
  Search,
  User,
  Wallet,
  X,
} from "lucide-react";

import Logo from "@/components/common/logo";
import { useAuth } from "@/hooks/use-auth";
import { useWallet } from "@/hooks/use-wallet";


const sports = [
  "Football",
  "Live",
  "Basketball",
  "Tennis",
  "Crash",
];


export default function Navbar() {

  const [open, setOpen] = useState(false);

  const {
    loggedIn,
    checked,
  } = useAuth();


  const {
    data: wallet,
  } = useWallet();



  if (!checked) {
    return null;
  }



  return (
    <>

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">


        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">


          <div className="flex items-center gap-3">


            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
            >
              <Menu size={22} />
            </button>


            <Logo />


          </div>




          <nav className="hidden items-center gap-6 lg:flex">

            {sports.map((sport) => (

              <button
                key={sport}
                className="text-sm font-medium text-slate-300 hover:text-green-400"
              >
                {sport}
              </button>

            ))}

          </nav>





          <div className="flex items-center gap-2">


            <button
              className="rounded-lg p-2 hover:bg-slate-800"
            >
              <Search size={20}/>
            </button>





            {loggedIn ? (

              <>


                {/* Wallet Balance */}

                <div
                  className="
                  hidden
                  rounded-lg
                  border
                  border-slate-700
                  px-4
                  py-2
                  md:block
                  "
                >

                  <p className="text-xs text-slate-400">
                    Balance
                  </p>


                  <p className="font-bold text-green-400">

                    KES {wallet?.balance ?? 0}

                  </p>


                </div>





                <Link
                  href="/deposit"
                  className="
                  hidden
                  rounded-lg
                  bg-green-600
                  px-4
                  py-2
                  font-semibold
                  hover:bg-green-500
                  md:block
                  "
                >
                  Deposit
                </Link>





                <Link
                  href="/profile"
                  className="
                  rounded-lg
                  border
                  border-slate-700
                  p-2
                  hover:bg-slate-800
                  "
                >
                  <User size={20}/>
                </Link>



              </>


            ) : (


              <>


                <Link
                  href="/login"
                  className="
                  rounded-lg
                  border
                  border-slate-700
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  hover:bg-slate-800
                  "
                >
                  Login
                </Link>



                <Link
                  href="/register"
                  className="
                  hidden
                  rounded-lg
                  bg-green-600
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  hover:bg-green-500
                  md:block
                  "
                >
                  Register
                </Link>


              </>

            )}


          </div>


        </div>





        <div
          className="
          overflow-x-auto
          border-t
          border-slate-800
          lg:hidden
          "
        >

          <div className="flex gap-3 px-4 py-3">


            {sports.map((sport)=>(

              <button
                key={sport}
                className="
                whitespace-nowrap
                rounded-full
                bg-slate-800
                px-4
                py-2
                text-sm
                hover:bg-green-600
                "
              >

                {sport}

              </button>

            ))}


          </div>

        </div>


      </header>







      {open && (

        <div className="fixed inset-0 z-[60] bg-black/60">


          <div className="h-full w-72 bg-slate-900">


            <div className="flex items-center justify-between border-b border-slate-800 p-5">


              <Logo />


              <button
                onClick={()=>setOpen(false)}
              >
                <X/>
              </button>


            </div>





            <div className="space-y-2 p-4">



              {!loggedIn && (

                <>


                  <Link
                    href="/login"
                    className="
                    block
                    rounded-lg
                    bg-green-600
                    p-3
                    text-center
                    font-bold
                    "
                  >
                    Login
                  </Link>



                  <Link
                    href="/register"
                    className="
                    block
                    rounded-lg
                    p-3
                    hover:bg-slate-800
                    "
                  >
                    Register
                  </Link>


                </>

              )}





              <Link
                href="/"
                className="block rounded-lg p-3 hover:bg-slate-800"
              >
                Home
              </Link>



              <Link
                href="/live"
                className="block rounded-lg p-3 hover:bg-slate-800"
              >
                Live Betting
              </Link>





              {loggedIn && (

                <>


                  <div className="rounded-lg bg-slate-800 p-3">

                    <p className="text-xs text-slate-400">
                      Wallet Balance
                    </p>

                    <p className="font-bold text-green-400">
                      KES {wallet?.balance ?? 0}
                    </p>

                  </div>




                  <Link
                    href="/my-bets"
                    className="block rounded-lg p-3 hover:bg-slate-800"
                  >
                    My Bets
                  </Link>



                  <Link
                    href="/transactions"
                    className="block rounded-lg p-3 hover:bg-slate-800"
                  >
                    Transactions
                  </Link>




                  <Link
                    href="/deposit"
                    className="
                    block
                    rounded-lg
                    bg-green-600
                    p-3
                    text-center
                    font-bold
                    "
                  >
                    Deposit
                  </Link>



                </>

              )}



            </div>


          </div>


        </div>

      )}






      <nav
        className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-slate-800
        bg-slate-950
        xl:hidden
        "
      >


        <div className="grid grid-cols-4">



          <Link
            href="/"
            className="flex flex-col items-center py-3 text-xs"
          >
            Home
          </Link>



          <Link
            href="/live"
            className="flex flex-col items-center py-3 text-xs"
          >
            Live
          </Link>





          <Link
            href={loggedIn ? "/deposit" : "/login"}
            className="
            flex
            flex-col
            items-center
            py-3
            text-xs
            text-green-400
            "
          >

            <Wallet size={20}/>

            {loggedIn ? "Deposit" : "Login"}

          </Link>






          <Link
            href={loggedIn ? "/profile" : "/register"}
            className="flex flex-col items-center py-3 text-xs"
          >

            <User size={20}/>

            {loggedIn ? "Profile" : "Register"}

          </Link>



        </div>


      </nav>



    </>
  );
}