<template>
  <div id="payment-method">
  </div>
  <button
    className="btn primary w-100"
    @click="async () => {
             const paymentWidget = paymentWidgetRef.current;
                try {
                  await paymentWidget?.requestPayment({
                    orderId: generateRandomString(),
                    orderName: '토스 티셔츠 외 2건',
                    customerName: '김토스',
                    customerEmail: 'customer123@gmail.com',
                    successUrl: window.location.origin + '/sandbox/success' + window.location.search,
                    failUrl: window.location.origin + '/sandbox/fail' + window.location.search
                  });
                } catch (error) {

                }
            }"
  >결제하기</button>
  <FooterLayout />
</template>

<script setup lang="ts">
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk'
import FooterLayout from "layouts/FooterLayout.vue";
import { onMounted } from "vue";
const clientKey = process.env.TOSS_CLIENT_KEY
const customerKey = process.env.TOSS_CUSTOMER_KEY

onMounted(() => {
  // startPayment()
  main()
})

// 결제위젯 초기화: async/await을 사용하는 경우
async function main() {
  console.log(clientKey, customerKey);
  if(!clientKey || !customerKey) {
    throw new Error('clientKey or customerKey is not defined')
  }

  // async await 사용하는 경우
  const paymentWidget = await loadPaymentWidget(
    clientKey ? clientKey : '',
    customerKey ? customerKey : '')
    .then(paymentWidget => {
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-method',
        {
          value: 10000,
          currency: 'KRW',
          country: 'KR',
        },
        { variantKey: 'widgetA' }
      )
    }).finally(() => {
      console.log('finally')
      console.log(clientKey, customerKey);
    })

}

function startPayment() {
  // 결제위젯 초기화: Promise를 사용하는 경우
  loadPaymentWidget(
    clientKey ? clientKey : '',
    customerKey ? customerKey : '')
    .then(paymentWidget => {
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-method',
        {
          value: 10000,
          currency: 'KRW',
          country: 'KR',
        },
        { variantKey: 'widgetA' }
      )
    }).finally(() => {
    console.log('finally')
    console.log(clientKey, customerKey);
  })

}

async


</script>

<style scoped>

</style>
