import service from "@/utils/service";

export function getRecArtists(): Promise<Artists> {
  return service({
    url: "/top/artists?offset=0&limit=6",
    method: "get",
  });
}
