import { getPrismicClient } from "@/services/prismic";
import Link from "next/link";
import { RichText } from "prismic-dom";

type Post = {
  slug: string | null;
  title: string;
  excerpt: string;
  updatedAt: string;
};

export const metadata = {
  title: "Posts | ignews",
};

export default async function Posts() {
  const posts = await getPostPageData();

  return (
    <main className="max-w-[1120px] my-0 mx-auto py-0 px-8">
      <div className="max-w-[720px] mt-20 mb-0 mx-auto">
        {posts.map((post) => (
          <Link
            href="#"
            className="block mt-8 pt-8 border-t border-t-gray-700 border-t-solid"
            key={post.slug}
          >
            <time className="text-base flex items-center text-gray-300">{post.updatedAt}</time>
            <strong className="block text-2xl mt-4 leading-8 duration-200 hover:text-yellow-500">{post.title}</strong>
            <p className="text-gray-300 mt-2 leading-[1.625rem]">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export async function getPostPageData(): Promise<Post[]> {
  const prismic = getPrismicClient();
  const response = await prismic.getAllByType("publication");

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: any) => content.type === "paragraph")?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return posts;
}
