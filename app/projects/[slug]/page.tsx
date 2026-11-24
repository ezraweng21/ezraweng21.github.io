import { notFound, redirect } from "next/navigation";
import { profile } from "@/data/profile";
import { getProjectBySlug, publicProjects } from "@/data/projects";

export function generateStaticParams() {
  return publicProjects.map(({ slug }) => ({ slug }));
}

export default async function ProjectBookmark({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  if (profile.schoolExperience.some(entry => entry.projectSlug === slug)) redirect(`/experience#${slug}`);
  redirect(`/projects#${slug}`);
}
