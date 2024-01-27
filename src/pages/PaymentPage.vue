<template>
  <div id='payment-method'>
  </div>
  <button
    className='btn primary w-100'
    @click='startPayment'
  >결제하기</button>
  <FooterLayout />
</template>

<script setup lang='ts'>
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk'
import FooterLayout from 'layouts/FooterLayout.vue';
import { onMounted, ref } from 'vue';
const paymentWidgetRef = ref(null);
const paymentMethodsWidgetRef = ref(null);
const agreementWidgetRef = ref(null);
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
          value: 20000,
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

async function goPayment() {
  const paymentWidget = paymentWidgetRef.value;

  try {

  } catch {

  }
}

</script>

<style scoped>

</style>
