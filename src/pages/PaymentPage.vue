<template>
  <div id="payment-method">
    <div id="agreement" class="w-100" />
  </div>
  <div class="button-box content-center">
    <q-btn color="primary" class="center" @click="startPayment">결제하기</q-btn>
  </div>
</template>

<script setup lang="ts">
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { onMounted, ref } from 'vue';
const paymentWidgetRef: any = ref(null);
const paymentMethodsWidgetRef = ref(null);
const agreementWidgetRef = ref(null);
const clientKey = process.env.TOSS_CLIENT_KEY;
const customerKey = process.env.TOSS_CUSTOMER_KEY;

onMounted(() => {
  // startPayment()
  main();
});

const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(0, 20);

// 결제위젯 초기화: async/await을 사용하는 경우
async function main() {
  console.log(clientKey, customerKey);
  if (!clientKey || !customerKey) {
    throw new Error('clientKey or customerKey is not defined');
  }

  console.log('start load payment widget');

  const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 customerKey

  if (paymentWidgetRef.value == null) {
    paymentWidgetRef.value = paymentWidget;
  }

  const paymentMethodsWidget = paymentWidgetRef.value.renderPaymentMethods(
    '#payment-method',
    { value: 1000 },
    { variantKey: 'DEFAULT' }
  );

  agreementWidgetRef.value = paymentWidgetRef.value.renderAgreement(
    '#agreement',
    { variantKey: 'DEFAULT' }
  );

  paymentMethodsWidgetRef.value = paymentMethodsWidget;
}

async function startPayment() {
  const paymentWidget = paymentWidgetRef.value;

  console.log(paymentWidget);

  try {
    await paymentWidget?.requestPayment({
      orderId: generateRandomString(),
      orderName: '토스 티셔츠 외 2건',
      customerName: '김토스',
      customerEmail: 'customer123@gmail.com',
      successUrl: window.location.origin,
      failUrl: window.location.origin + '/payment',
    });
  } catch (error) {
    // TODO: 에러 처리
  }
}

async function goPayment() {
  const paymentWidget = paymentWidgetRef.value;

  try {
  } catch {}
}
</script>

<style scoped></style>
