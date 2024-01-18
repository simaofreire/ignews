import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrismicClient } from "@/services/prismic";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RichText } from "prismic-dom";

interface PostPageProps {
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

export default async function Post({ params }: PostPageProps) {
  const post: PostProps = await getPostData(params.slug);

  return (
    <main className="max-w-[1120px] my-0 mx-auto py-0 px-8">
      <article className="max-w-[720px] mt-20 mx-auto mb-0">
        <h1 className="text-[3.5rem] font-black leading-none">{post.title}</h1>
        <time className="block text-base text-gray-300 mt-6">{post.updatedAt}</time>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="mt-8 text-[1.125rem] leading-8 text-gray-100 [&>p]:my-6 [&>p]:mx-0 [&>ul]:my-6 [&>ul]:mx-0 [&>ul]:pl-6 [&>li]:my-2 [&>li]:mx-0"
        />
      </article>
    </main>
  );
}

async function getPostData(slug: string) {
  const session: SessionProps | null = await getServerSession(authOptions);

  if (!session?.user || !session?.subscriptionStatus) return redirect(`/posts/preview/${slug}`);

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("publication", slug, {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  };

  return post;
}

async function generateMetadata({ params }: PostPageProps, parent?: ResolvingMetadata): Promise<Metadata> {
  const res = await getPostData(params.slug);
  return {
    title: `${res.title} | ig.news`
  };
}
