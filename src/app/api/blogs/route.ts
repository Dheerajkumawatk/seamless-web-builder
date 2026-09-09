import { NextResponse } from "next/server";
import { listBlogPosts } from "@/lib/blog.server";

export async function GET() {
  const blogs = await listBlogPosts();
  return NextResponse.json({ blogs });
}
