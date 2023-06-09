import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrismicClient } from "@/services/prismic";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RichText } from "prismic-dom";

interface PostPagePreviewProps {
  params: {
    slug: string;
  };
}

interface PostProps {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface SessionProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
  subscriptionStatus: boolean;
}

export default async function PostPreview({ params }: PostPagePreviewProps) {
  const post: PostProps = await getPostData(params.slug);

  return (
    <main className="max-w-[1120px] my-0 mx-auto py-0 px-8">
      <article className="max-w-[720px] mt-20 mx-auto mb-0">
        <h1 className="text-[3.5rem] font-black leading-none">{post.title}</h1>
        <time className="block text-base text-gray-300 mt-6">{post.updatedAt}</time>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="mt-8 text-[1.125rem] leading-8 text-gray-100 [&>p]:my-6 [&>p]:mx-0 [&>ul]:my-6 [&>ul]:mx-0 [&>ul]:pl-6 [&>li]:my-2 [&>li]:mx-0 bg-clip-text text-transparent bg-gradient-to-b from-gray-100 fill-transparent"
        />

        <div className="p-8 mt-16 mx-0 mb-8 font-bold text-xl rounded-[100px] bg-gray-850 text-center">
          Wanna continue reading?
          <Link
            href="/"
            className="text-yellow-500 ml-2 hover:underline duration-1000 transition-all"
          >
            Subscribe now 🤗
          </Link>
        </div>
      </article>
    </main>
  );
}

export async function getPostData(slug: string) {
  const session: SessionProps | null = await getServerSession(authOptions);

  if (session?.user && session?.subscriptionStatus) return redirect(`/posts/${slug}`);

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("publication", slug, {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  };

  return post;
}

export async function generateMetadata(
  { params }: PostPagePreviewProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const res = await getPostData(params.slug);
  return {
    title: `${res.title} | ig.news`
  };
}
