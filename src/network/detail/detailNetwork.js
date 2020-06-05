import sendRequest from "../sendRequest"

export function getDetailData(iid) {
  return sendRequest({
    url: '/detail',
    params: {
      iid: iid
    }
  })
}


export class DetailData {
  constructor(swiperImages,detailImages,sellerInfo,productInfo){
    this.swiperImages = swiperImages;
    this.detailImages = detailImages;
    this.sellerInfo = sellerInfo;
    this.productInfo = productInfo;
  }
}

export class ItemInfo {
  constructor(desc,lowestPrice,highestPrice,deletePrice,discount,sales,collect,) {

  }
}

export class SellerInfo {
  constructor(fans,goods,sells,name,level,) {
    
  }
}