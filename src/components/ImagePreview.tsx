import Image from "next/image";
import { api } from "~/utils/api";

export default function ImagePreview() {
  const urls = api.image.getUrl.useQuery();

  console.log(urls.data);
  return (
    <div className="grid max-w-screen-xl grid-cols-2 p-8 md:grid-cols-3 lg:grid-cols-4">
      {urls.data?.map((url) => (
        <div className="max-w-screen-sm">
          <Image src={url.url} alt={"Test image"} width={300} height={300} />
        </div>
      ))}
    </div>
  );
}
