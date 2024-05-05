"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Divide, LogOut } from "lucide-react";
import Link from "next/link";
import path from "path";
import { SearchInput } from "./SearchInput";
import { useAuth } from "@clerk/nextjs";
import { IsTeacher } from "@/lib/teacher";

export const NavbarRoutes = () => {
  const pathName = usePathname();
  const { userId } = useAuth();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isCoursePage = pathName?.includes("/courses");
  const isSearchPage = pathName?.includes("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : IsTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <div className="pr-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};