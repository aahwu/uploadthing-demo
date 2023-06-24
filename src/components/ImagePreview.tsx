import Image from "next/image";
import { api } from "~/utils/api";

export default function ImagePreview() {
  const images = api.image.getUrl.useQuery();

  console.log(images.data);
  return (
    <div className="grid max-w-screen-xl grid-cols-2 p-8 md:grid-cols-3 lg:grid-cols-4">
      {images.data?.map((image) => (
        <div className="max-w-screen-sm" key={image.id}>
          <Image src={image.url} alt={"Test image"} width={300} height={300} />
        </div>
      ))}
    </div>
  );
}
