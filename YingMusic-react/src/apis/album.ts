import service from "@/utils/service";

export function getNewAlbum(
  area: string,
  limit: number,
  offset: number
): Promise<Album> {
  return service({
    url: `/album/new?area=${area}&limit=${limit}&offset=${offset * limit}`,
    method: "get",
  });
}
