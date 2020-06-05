import sendRequest from "../sendRequest"

export function getBanners(){
  return sendRequest({
    url: '/home/multidata'
  })
}
// http://152.136.185.210:8000/api/n3/home/data?type=pop&page=1
export function getDisplayData(type,page){
  return sendRequest({
    url: `http://152.136.185.210:8000/api/n3/home/data`,
    method: 'GET',
    params: {
      type: type,
      page: page
    }
  })
}