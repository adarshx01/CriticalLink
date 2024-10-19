import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";
// import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { string } from "zod";

const Navbar = async()=>{
    const {getUser}=getKindeServerSession();
    const user = await getUser();
    const isAdmin = user?.email === process.env.ADMIN_EMAIL
return (
    <nav className='sticky z-[60] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/25 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
            <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                <Link href='/' className='flex z-40 font-semibold'>
                    <Brain className="h-6 w-6 text-primary mx-1" />
                    Critical<span className='text-green-300'>Link</span>
                </Link>
                <div className='h-full flex items-center space-x-4'>
                    {user?(
                        <>
                         <p>{user?.given_name+" "+user?.family_name}</p>
                            <Link href='/api/auth/logout' className={buttonVariants({
                                size:'sm',
                                variant:'ghost'
                                })}>
                                Sign Out
                            </Link>
                            {isAdmin?(
                            <Link href='/dashboard' className={buttonVariants({
                                size:'sm',
                                variant:'ghost'
                                })}>
                                Dashboard 🌟
                            </Link>
                            ):null }
                            <Link href='/configure/upload' className={buttonVariants({
                                size:'sm',
                                className:'hidden sm:flex items-center gap-1'
                                })}>
                                Start Monitoring
                                <ArrowRight className="ml-1.5 h-5 w-5"/>
                            </Link>
                        </>
                    ):(
                        <>
                            <Link href='/api/auth/register' className={buttonVariants({
                                size:'sm',
                                variant:'ghost'
                                })}>
                                Sign Up
                            </Link>
                            <Link href='/api/auth/login' className={buttonVariants({
                                size:'sm',
                                variant:'ghost'
                                })}>
                                Log in 
                            </Link>
                            {/* <Link href='/api/auth/login' className={buttonVariants({
                                size:'sm',
                                variant:'ghost'
                                })}>
                                Log in 
                            </Link> */}
                            <div className="h-8 bg-zinc-200 hidden sm:block"/>
                            <Link href='/configure/upload' className={buttonVariants({
                                size:'sm',
                                className:'hidden sm:flex items-center gap-1'
                                })}>
                            Realtime Updates
                                <ArrowRight className="ml-1.5 h-5 w-5"/>
                            </Link> 
                        </>
                    )}
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
)
}
export default Navbar