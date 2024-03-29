import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get("query");
  // handle if query is not in the url
  if (!query) {
    return new Response(
      JSON.stringify({
        error: "No query provided",
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
  // handle if query is in the url
  const allBlogArticles: CollectionEntry<"blog">[] =
    await getCollection("blog");

  const searchResults = allBlogArticles.filter((article) => {
    const titleMatch: boolean = article.data.title
      .toLowerCase()
      .includes(query!.toLowerCase());

    const bodyMatch: boolean = article.body
      .toLowerCase()
      .includes(query!.toLowerCase());

    const slugMatch: boolean = article.slug
      .toLowerCase()
      .includes(query!.toLowerCase());

    return titleMatch || bodyMatch || slugMatch;
  });
  return new Response(
    JSON.stringify(searchResults),{
      status: 200 ,  
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
