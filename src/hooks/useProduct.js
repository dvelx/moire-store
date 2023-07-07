import { reactive, ref } from "vue";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import numberFormat from "@/helpers/numberFormat";

//функция для получения определенного товара по его ID

export default function () {
    const productData = ref(null)
    const sizeId = ref(null)
    const colorId = ref(null)
    const fetchStatus = reactive({
      isFaild: false,
      isLoading: false
    })
    const fetchProduct = (productId) => {
      fetchStatus.isLoading = true
      fetchStatus.isFaild = false
      axios.get(API_BASE_URL + '/products/' + productId)
        .then(res => {
          const product = res.data
          productData.value = Object.assign(product, {
            priceFormat: numberFormat(product.price)
          })
          sizeId.value = product.sizes[0].id
          colorId.value = product.colors[0].color.id
        })
        .catch(() => fetchStatus.isFaild = true)
        .then(() => fetchStatus.isLoading = false)
    }

    return {
      product: productData,
      sizeId,
      colorId,
      fetchProduct
    }
}




