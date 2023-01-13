import service from "@/utils/service";

export function getMVList(area: string): Promise<MVData> {
  return service({
    url: `/mv/first?limit=10&area=${area}`,
    method: "get",
  });
}
